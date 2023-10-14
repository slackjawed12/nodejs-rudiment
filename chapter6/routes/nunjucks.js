import express from "express";

const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("index_test", { title: "express" });
});

export default router;
