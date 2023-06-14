import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { JwtModuleOptions } from '@nestjs/jwt';
import { configType } from './config.type';

export const envFile: configType = {
  dbDatabase: process.env.DB_DATABASE || 'requests',
  dbHost: process.env.DB_HOST || 'localhost',
  dbPassword: process.env.DB_PASSWORD || 'root',
  dbPort: Number(process.env.DB_PORT) || 5432,
  dbUsername: process.env.DB_USERNAME || 'root',
  appPort: Number(process.env.APP_PORT) || 5000,
  appHost: process.env.APP_HOST || 'http://localhost:5000',
  jwtSecret: process.env.JWT_KEY || 'someSecret',
  jwtExpiresIn: process.env.JWT_EXPIRES || '7d',

 };

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: envFile.dbHost,
  port: envFile.dbPort,
  username: envFile.dbUsername,
  password: envFile.dbPassword,
  database: envFile.dbDatabase,
  migrationsRun: true,
  entities: [__dirname + '/../**/*.entity.{ts,js}'],
  migrations: [__dirname + '/../migrations/*.{ts,js}'],
  subscribers: [__dirname + '/../**/*.subscriber.{ts,js}'],
};

export const jwtOptions: JwtModuleOptions = {
  secret: envFile.jwtSecret,
  signOptions: {
    expiresIn: envFile.jwtExpiresIn,
  },
};

export const hashConfig = {
  saltRounds: Number(process.env.SALT_ROUNDS || 10)
};

export default () => ({
  database: typeOrmConfig
})



