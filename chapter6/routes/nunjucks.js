import express from "express";

const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("index_test", { title: "express" });
});

router.get("/include", (req, res, next) => {
  res.render("main", { title: "express" });
});

router.get("/extends", (req, res, next) => {
  res.render("body", { title: "express" });
});

export default router;
