import { closeDatabase, initDatabase } from '#database';
import { initializeSocketIO } from '#socket';
import dotenv from 'dotenv';
import http from 'http';
import app from './app.js';

dotenv.config();

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;

const start = async () => {
  try {
    await initDatabase();
    
    const server = http.createServer(app);

    initializeSocketIO(server);

    const shutdown = async () => {
      console.log('\n Received termination signal. Closing HTTP server and DB connections...');

      server.close(async () => {
        console.log('HTTP/Socket.IO server closed.');

        await closeDatabase();

        console.log('Application cleanup complete. Exiting process.');
        process.exit(0);
      });

      setTimeout(() => {
        console.error('Forcing shutdown after timeout.');
        process.exit(1);
      }, 10000).unref();
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);

    server.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error during server startup:', error);
    process.exit(1);
  }
};

start();
