import express from "express";
import db from "../models/index.js";
const router = express.Router();

router
  .get("/", async (req, res, next) => {
    try {
      const users = await db.User.findAll();
      res.json(users);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .post("/", async (req, res, next) => {
    try {
      const user = await db.User.create({
        name: req.body.name,
        age: req.body.age,
        married: req.body.married,
      });
      console.log(user);
      res.status(201).json(user);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

router.get("/:id/comments", async (req, res, next) => {
  try {
    const comments = await db.Comment.findAll({
      include: {
        model: db.User,
        where: { id: req.params.id },
        as: "User",
      },
    });
    console.log(comments);
    res.json(comments);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

export default router;
