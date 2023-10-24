import express from "express";
import db from "../models/index.js";
const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const comment = await db.Comment.create({
      commenter: req.body.id,
      comment: req.body.comment,
    });
    console.log(comment);
    res.status(201).json(comment);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router
  .patch("/:id", async (req, res, next) => {
    try {
      const result = await db.Comment.update(
        {
          comment: req.body.comment,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.json(result);
    } catch (err) {
      console.error(err);
      enxt(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const result = await db.Comment.destory({ where: { id: req.params.id } });
      res.json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

export default router;
