import express from "express";
import User from "../schemas/user.js";
import Comment from "../schemas/comment.js";
import { Types } from "mongoose";
const router = express.Router();

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const users = await User.find({});
      res.json(users);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      const user = await User.create({
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
    // commenter 필드 ref = User
    // users 컬렉션에서 사용자 document를 찾고, commenter 필드는 해당 user 다큐먼트가 된다.
    const comments = await Comment.find({
      commenter: new Types.ObjectId(req.params.id),
    }).populate("commenter");

    console.log("comment", comments);

    res.json(comments);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

export default router;
