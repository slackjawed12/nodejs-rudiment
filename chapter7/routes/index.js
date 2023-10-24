import express from "express";
import db from "../models/index.js";
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const users = await db.User.findAll();
    res.render("sequelize", { users });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

export default router;
