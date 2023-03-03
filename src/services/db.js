import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

import Constant from '../config/config.js';

const pgConfig = Constant.instance.DATABASE_CONFIG; 

dotenv.config();

export const pool = new Pool({
  host: pgConfig.host,
  port: pgConfig.port,
  database: pgConfig.database,
  user: pgConfig.username,
  password: pgConfig.password,
});

