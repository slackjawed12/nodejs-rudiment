import { Comment } from "../models/comment.js";
import db from "../models/index.js";
import { Op } from "sequelize";
export const Queries = async () => {
  const findAllUser = await db.User.findAll();
  const findOneUser = await db.User.findOne();
  const findWithOr = await db.User.findAll({
    attributes: ["id", "name"],
    where: {
      [Op.or]: [{ married: false }, { age: { [Op.gt]: 30 } }],
    },
  });

  // update query
  // await db.User.update(
  //   {
  //     comment: "바뀐 내용 두번째",
  //   },
  //   { where: { id: 2 } }
  // );

  // delete query : destory
  // await db.User.destroy({
  //   where: { id: 3 },
  // });

  // join
  const user = await db.User.findOne({
    include: [
      {
        model: db.Comment,
        as: "Comment",
      },
    ],
  });

  /**
   * 연관관계 설정 시, get + 별칭 형식으로 메서드가 생긴다.
   */
  const comments = await user.getComment();

  const [result, metadata] = await db.sequelize.query("SELECT * from comments");
  console.log(result);
  console.log(metadata);
};
