import Sequelize from "sequelize";

export class Post extends Sequelize.Model {
  static initModel(sequelize) {
    return sequelize.define(
      "Post",
      {
        content: {
          type: Sequelize.STRING(140),
          allowNull: false,
        },
        img: {
          type: Sequelize.STRING(200),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Post",
        tableName: "posts",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
        classMethods: {
          associate: function (db) {
            db.Post.belongsTo(db.User);
            db.Post.belongsToMany(db.Hashtag, { through: "PostHashtag" });
          },
        },
      }
    );
  }
}
