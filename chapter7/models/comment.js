import { Sequelize } from "sequelize";

export class Comment extends Sequelize.Model {
  static initModel(sequelize) {
    return sequelize.define(
      "Comment",
      {
        comment: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
      },
      {
        sequelize,
        timestamps: false,
        modelName: "Comment",
        tableName: "comments",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
        classMethods: {
          associate: function (db) {
            db.Comment.belongsTo(db.User, {
              as: "User",
              foreignKey: "commenter",
              targetKey: "id",
            });
          },
        },
      }
    );
  }
}
