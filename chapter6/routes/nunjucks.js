import express from "express";

const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("nunjucks/index", { title: "express" });
});

router.get("/error", (req, res, next) => {
  next(new Error("this is nunjucks error"));
});

router.get("/include", (req, res, next) => {
  res.render("main", { title: "express" });
});

router.get("/extends", (req, res, next) => {
  res.render("body", { title: "express" });
});

export default router;
