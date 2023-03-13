const { Pool } = require ('pg');
const dotenv = require('dotenv');

import constant from '../config/config.js';

const pgConfig = constant.DATABASE_CONFIG; 

dotenv.config();

export const pool = new Pool({
  host: pgConfig.host,
  port: pgConfig.port,
  database: pgConfig.database,
  user: pgConfig.username,
  password: pgConfig.password,
});

