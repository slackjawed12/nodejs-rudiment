import dotenv from "dotenv";

dotenv.config();
export const config = {
  development: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: "nodebird_dev",
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
    password: process.env.DB_PASSWORD,
    database: "nodebird_prod",
    host: "127.0.0.1",
  },
};
