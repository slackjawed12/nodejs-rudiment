import config from "../config/config.js";
import { Sequelize } from "sequelize";
import process from "process";
import { User } from "./user.js";
import { Post } from "./post.js";
import { Hashtag } from "./hashtag.js";

const env = process.env.NODE_ENV || "development";

/**
 * initialize Sequelize object
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
 */
const _User = User.initModel(sequelize);
const _Post = Post.initModel(sequelize);
const _Hashtag = Hashtag.initModel(sequelize);

const db = {};
db[_User.name] = _User;
db[_Post.name] = _Post;
db[_Hashtag.name] = _Hashtag;

/**
 * associate parent - child tables
 */
Object.keys(db).forEach((modelName) => {
  if (db[modelName].options.classMethods.associate) {
    db[modelName].options.classMethods.associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
export default db;
