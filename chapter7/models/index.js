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
const _User = User.initModel(sequelize);
const _Comment = Comment.initModel(sequelize);
// _Comment.belongsTo(User, {
//   as: "User",
//   foreignKey: "commenter",
//   targetKey: "id",
// });
// _User.hasMany(Comment, {
//   as: "Comment",
//   foreignKey: "commenter",
//   // sourceKey: "id",
// });

const db = {};
db[_User.name] = _User;
db[_Comment.name] = _Comment;

/**
 * associate parent - child tables
 */
Object.keys(db).forEach((modelName) => {
  if (db[modelName].options.classMethods.associate) {
    db[modelName].options.classMethods.associate(db);
  }
});

console.log(db["Comment"].rawAttributes);
db.sequelize = sequelize;
db.Sequelize = Sequelize;
export default db;
