import Sequelize from "sequelize";

export class User extends Sequelize.Model {
  static initModel(sequelize) {
    return sequelize.define(
      "User",
      {
        name: {
          type: Sequelize.STRING(20),
          allowNull: false,
          unique: true,
        },
        age: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
        },
        married: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
        comment: {
          type: Sequelize.TEXT,
          allowNull: true,
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
        modelName: "User",
        tableName: "users",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
        classMethods: {
          associate: function (db) {
            db.User.hasMany(db.Comment, {
              as: "Comment",
              foreignKey: "commenter",
              sourceKey: "id",
            });
          },
        },
      }
    );
  }
}
