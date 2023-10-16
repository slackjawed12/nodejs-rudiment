import dotenv from "dotenv";

dotenv.config();
export const config = {
  development: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: "nodejs",
    host: "127.0.0.1",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
  },
};
