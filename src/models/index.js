import { Sequelize, DataTypes } from 'sequelize';
import Constant from '../config/config.js';

const config = Constant.instance.DATABASE_CONFIG;
console.log("🚀 ~ file: index.js:5 ~ config:", config)

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect
});

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}