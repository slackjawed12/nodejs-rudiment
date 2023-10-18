import { config } from "../config/config.js";
import { Sequelize } from "sequelize";
import process from "process";
import { User } from "./user.js";
import { Comment } from "./comment.js";

const env = process.env.NODE_ENV || "development";
/**
 * initialize Sequelize object
 * connecting db, sequelize by configuration json file
 */
const sequelize = new Sequelize(
  config[env].database,
  config[env].username,
  config[env].password,
  {
    host: "127.0.0.1",
    dialect: "mysql",
  }
);

/**
 *  -- mapping domain models and db tables --
 * by initModel -> define method of sequelize object
 */
const user = User.initModel(sequelize);
const comment = Comment.initModel(sequelize);
const db = {};
db[user.name] = user;
db[comment.name] = comment;

/**
 * associate parent - child tables
 */
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
export default db;
