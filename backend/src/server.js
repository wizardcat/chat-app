import { closeDatabase, initDatabase } from '#database';
import { initializeSocketIO } from '#socket';
import dotenv from 'dotenv';
import http from 'http';
import app from './app.js';
import { logger } from './utils/logger.js';

dotenv.config();

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;

const start = async () => {
  try {
    await initDatabase();
    
    const server = http.createServer(app);

    initializeSocketIO(server);

    const shutdown = async () => {
      logger.info('Received termination signal. Closing HTTP server and DB connections...');

      server.close(async () => {
        logger.info('HTTP/Socket.IO server closed.');

        await closeDatabase();

        logger.info('Application cleanup complete. Exiting process.');
        process.exit(0);
      });

      setTimeout(() => {
        logger.error('Forcing shutdown after timeout.');
        process.exit(1);
      }, 10000).unref();
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);

    server.listen(PORT, () => {
      logger.info(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    logger.error({ err: error }, 'Error during server startup');
    process.exit(1);
  }
};

start();
