import { initMessageModel } from '../modules/messages/message.model.js';
import { initUserModel } from '../modules/users/user.model.js';
import { logger } from '../utils/logger.js';
import { sequelize } from './sequelize.js';

export const models = {};

export async function initDatabase() {
  try {
    await sequelize.authenticate();
    logger.info('DB connected');

    models.User = initUserModel(sequelize);
    models.Message = initMessageModel(sequelize);

    if (process.env.NODE_ENV !== 'production') {
      await sequelize.sync({ alter: true });
    }

    logger.info('Models synchronized');
  } catch (error) {
    logger.error('DB init failed:', error);
    throw error;
  }
}

export async function closeDatabase() {
  try {
    await sequelize.close();
    logger.info('Sequelize: Connection closed.');
  } catch (error) {
    logger.error('Sequelize: Error closing connection:', error);
  }
}
