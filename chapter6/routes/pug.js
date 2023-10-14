import express from "express";
const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("index", { title: "express" });
  res.locals.comment = "good";
});

router.get("/error", (req, res, next) => {
  throw new Error("pug error");
});
export default router;
