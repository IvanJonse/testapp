import { DataSource } from 'typeorm';
import { typeOrmConfig } from './app.config';

const datasource = new DataSource(typeOrmConfig as any);
 datasource.initialize();
export default datasource;