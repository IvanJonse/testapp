import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { configType } from './config.type';

export const envFile: configType = {
  dbDatabase: process.env.DB_DATABASE || 'requests',
  dbHost: process.env.DB_HOST || 'localhost',
  dbPassword: process.env.DB_PASSWORD || 'root',
  dbPort: Number(process.env.DB_PORT) || 5432,
  dbUsername: process.env.DB_USERNAME || 'root',
  appPort: Number(process.env.APP_PORT) || 5000,
  appHost: process.env.APP_HOST || 'http://localhost:5000',
 };

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: envFile.dbHost,
  port: envFile.dbPort,
  username: envFile.dbUsername,
  password: envFile.dbPassword,
  database: envFile.dbDatabase,
};

export default () => ({
  database: typeOrmConfig
})


