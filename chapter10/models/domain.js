const Sequelize = require("sequelize");

class Domain extends Sequelize.Model {
  static initiate(sequelize) {
    Domain.init(
      {
        host: {
          type: Sequelize.STRING(80),
          allowNull: false,
        },
        type: {
          type: Sequelize.ENUM("free", "premium"),
          allowNull: false,
        },
        clientSecret: {
          type: Sequelize.UUID,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        modelName: "Domain",
        tableName: "domains",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
        classMethods: {
          associate: function (db) {
            db.Domain.belongsTo(db.User);
          },
        },
      }
    );
  }
  static initModel(sequelize) {
    return sequelize.define(
      "Domain",
      {
        host: {
          type: Sequelize.STRING(80),
          allowNull: false,
        },
        type: {
          type: Sequelize.ENUM("free", "premium"),
          allowNull: false,
        },
        clientSecret: {
          type: Sequelize.UUID,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        modelName: "Domain",
        tableName: "domains",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
        classMethods: {
          associate: function (db) {
            db.Domain.belongsTo(db.User);
          },
        },
      }
    );
  }
}
module.exports = Domain;
