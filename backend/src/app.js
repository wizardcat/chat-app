import routes from '#routes';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { API_BASE_PATH } from './config/api.config.js';
import { errorHandler } from './middleware/error-handler.js';

const app = express();

app.use(helmet());
app.use(cors());

app.use(express.json());

app.use(API_BASE_PATH, routes);

app.get(API_BASE_PATH, (req, res) => {
  res.send('Welcome to the API');
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Resource not found' });
});

app.use(errorHandler);

export default app;
