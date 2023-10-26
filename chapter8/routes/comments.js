import express from "express";

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const comment = await Comment.create({
      commenter: req.body.id,
      comment: req.body.comment,
    });
    console.log(comment);
    // path 옵션 : 어떤 필드를 합칠지 설정함
    const result = await Comment.populate(comment, { path: "commenter" });
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router
  .route("/:id")
  .patch(async (req, res, next) => {
    try {
      const result = await Comment.update(
        {
          _id: req.params.id,
        },
        {
          comment: req.body.comment,
        }
      );
      res.json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const result = await Comment.remove({ _id: req.params.id });
      res.json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

export default router;
