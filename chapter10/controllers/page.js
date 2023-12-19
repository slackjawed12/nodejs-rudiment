const db = require("../models/index.js");
const { Post, User, Hashtag } = db;

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

const renderHashtag = async (req, res, next) => {
  const query = req.query.hashtag;
  if (!query) {
    return res.redirect("/");
  }

  try {
    const hashtag = await Hashtag.findOne({
      where: {
        title: query,
      },
    });
    const posts = hashtag
      ? await hashtag.getPosts({
          include: [
            {
              model: User,
            },
          ],
        })
      : [];

    return res.render("main", {
      title: `${query} | NodeBird`,
      twits: posts,
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};
module.exports = { renderProfile, renderJoin, renderMain, renderHashtag };
