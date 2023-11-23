const config = require("../config/config.js");
const Sequelize = require("sequelize");
const process = require("process");
const User = require("./user.js");
const Post = require("./post.js");
const Hashtag = require("./hashtag.js");
const Domain = require("./domain.js");

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
const _Domain = Domain.initModel(sequelize);
const db = {};
db.User = User;
db.Post = Post;
db.Hashtag = Hashtag;
db.Domain = Domain;

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

module.exports = db;
