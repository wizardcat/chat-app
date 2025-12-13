import { Sequelize } from 'sequelize';
import { dbConfig } from '../config/db.config.js';

const { database, username, password, options } = dbConfig;

export const sequelize = new Sequelize(database, username, password, options);
