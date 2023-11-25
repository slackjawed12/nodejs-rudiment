const Sequelize = require("sequelize");

class Hashtag extends Sequelize.Model {
  static initiate(sequelize) {
    Hashtag.init(
      {
        title: {
          type: Sequelize.STRING(15),
          allowNull: false,
          unique: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Hashtag",
        tableName: "hashtags",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
        classMethods: {
          associate: function (db) {
            db.Hashtag.belongsToMany(db.Post, { through: "PostHashtag" });
          },
        },
      }
    );
  }
  static initModel(sequelize) {
    return sequelize.define(
      "Hashtag",
      {
        title: {
          type: Sequelize.STRING(15),
          allowNull: false,
          unique: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Hashtag",
        tableName: "hashtags",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
        classMethods: {
          associate: function (db) {
            db.Hashtag.belongsToMany(db.Post, { through: "PostHashtag" });
          },
        },
      }
    );
  }
}

module.exports = Hashtag;
