const dotenv = require("dotenv");

dotenv.config();
const config = {
  development: {
    username: "root",
    logging: null,
    password: process.env.DB_PASSWORD,
    database: "nodeauction",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  test: {
    username: "root",
    logging: null,
    password: process.env.DB_PASSWORD,
    database: "nodeauction_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    logging: null,
    password: process.env.DB_PASSWORD,
    database: "nodeauction",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};

module.exports = config;
