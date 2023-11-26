const { v4 } = require("uuid");
const db = require("../models/index.js");
const { User, Domain } = db;

const renderLogin = async (req, res, next) => {
  try {
    const { error } = req.query;
    if (error) {
      return res.render("error", {
        message: error,
      });
    }
    const user = await User.findOne({
      where: { id: req.user?.id || null },
      include: {
        model: Domain,
      },
    });
    res.render("login", {
      user,
      domains: user?.Domains,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const createDomain = async (req, res, next) => {
  try {
    await Domain.create({
      UserId: req.user.id,
      host: req.body.host,
      type: req.body.type,
      clientSecret: v4(),
    });
    res.redirect("/");
  } catch (error) {
    next(error);
  }
};
module.exports = { renderLogin, createDomain };
