const db = require("../models/index.js");
const { User } = db;

const follow = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.user.id,
      },
    });
    if (user) {
      await user.addFollowing(parseInt(req.params.id, 10));
      res.send("success");
    } else {
      res.status(404).send("no user");
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const deleteFollow = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.id,
      },
      include: {
        model: User,
        as: "Followers",
        where: {
          id: req.user.id,
        },
      },
    });
    if (user) {
      const follow = user.Followers.find((v) => v.id === req.user.id);
      await follow.Follow.destroy();
      res.send("success");
    } else {
      res.status(404).send("no user");
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = { follow, deleteFollow };
