import { DataSource } from 'typeorm';

import * as dotenv from 'dotenv';

dotenv.config();
export const AppDataSource = new DataSource({
  type: 'mysql',
  port: 3306,
  host: 'localhost',
  username: 'root',
  password: 'conga15214',
  database: 'project_demo',
  migrations: ['src/database/migrations/*.ts'],
  // cli: {
  //   migrationsDir: 'src/database/migrations',
  // },
});
