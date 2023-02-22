import { DataSourceOptions } from "typeorm";
import "dotenv/config";

export const config: DataSourceOptions = {
  //@ts-ignore
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ["dist/entity/**/*.js"],
  synchronize: true,
  logging: process.env.TYPEORM_LOGGING === "true",
};
