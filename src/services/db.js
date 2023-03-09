import { Pool } from 'pg';
import dotenv from 'dotenv';

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

