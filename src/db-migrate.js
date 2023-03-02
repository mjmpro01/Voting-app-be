import migrate from 'postgres-migrations';

import Constant from './config/config';

const pgConfig = Constant.instance.DATABASE_CONFIG; 
function main() {
  const dbConfig = {
    user: pgConfig.user,
    password: pgConfig.password,
    host: pgConfig.host,
    port: pgConfig.port,
    database: pgConfig.database,
  };

  return migrate(dbConfig, 'db-migrations/', {
    logger: console.log,
  });
}

main().catch((err) => {
  console.error('Error when migrage DB:', err);
});