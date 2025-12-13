import { initMessageModel } from '../modules/messages/message.model.js';
import { initUserModel } from '../modules/users/user.model.js';
import { sequelize } from './sequelize.js';

export const models = {};

export async function initDatabase() {
  try {
    await sequelize.authenticate();
    console.log('DB connected');

    models.User = initUserModel(sequelize);
    models.Message = initMessageModel(sequelize);

    if (process.env.NODE_ENV !== 'production') {
      await sequelize.sync({ alter: true });
    }

    console.log('Models synchronized');
  } catch (error) {
    console.error('DB init failed:', error);
    throw error;
  }
}

export async function closeDatabase() {
  try {
    await sequelize.close();
    console.log('Sequelize: Connection closed.');
  } catch (error) {
    console.error('Sequelize: Error closing connection:', error);
  }
}
