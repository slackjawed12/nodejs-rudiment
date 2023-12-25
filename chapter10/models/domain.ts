import Sequelize, {
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";

class Domain extends Model<
  InferAttributes<Domain>,
  InferCreationAttributes<Domain>
> {
  declare id: CreationOptional<number>;
  declare host: string;
  declare type: "free" | "premium";
  declare clientSecret: string;
  static initiate(sequelize: Sequelize.Sequelize) {
    Domain.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
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
      }
    );
  }
}

export default Domain;
