import db from "../models/index.js";
const { Post, User } = db;

const renderProfile = (req, res) => {
  res.render("profile", { title: "내 정보 - NodeBird" });
};

const renderJoin = (req, res) => {
  res.render("join", { title: "회원 가입 - NodeBird" });
};

const renderMain = async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      include: {
        model: User,
        attributes: ["id", "nick"],
      },
      order: [["createdAt", "DESC"]],
    });
    res.render("main", {
      title: "NodeBird",
      twits: posts,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export { renderProfile, renderJoin, renderMain };
