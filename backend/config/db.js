import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

const db = process.env.DB_NAME;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;

const dbConfig = {
  host: host,
  port: port || 3306,
  dialect: 'mysql',
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

const sequelize = new Sequelize(db, user, password, dbConfig);

export default sequelize;
