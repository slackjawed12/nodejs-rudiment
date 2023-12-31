import Sequelize, {
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  ForeignKey,
  BelongsToManyAddAssociationMixin,
  BelongsToManyAddAssociationsMixin,
} from "sequelize";
import User from "./user";
import Hashtag from "./hashtag";

class Post extends Sequelize.Model<
  InferAttributes<Post>,
  InferCreationAttributes<Post>
> {
  declare id: CreationOptional<number>;
  declare content: string;
  declare img: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare UserId: ForeignKey<User["id"]>;
  declare addHashtags: BelongsToManyAddAssociationsMixin<Hashtag, number>;

  static initiate(sequelize: Sequelize.Sequelize) {
    Post.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        content: {
          type: Sequelize.STRING(140),
          allowNull: false,
        },
        img: {
          type: Sequelize.STRING(200),
          allowNull: true,
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
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
      }
    );
  }
  static associate() {
    Post.belongsTo(User);
    Post.belongsToMany(Hashtag, { through: "PostHashtag" });
  }
}

export default Post;
