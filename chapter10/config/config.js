const dotenv = require("dotenv");

dotenv.config();
const config = {
  development: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: "nodebird",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: "nodebird",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};

module.exports = config;
