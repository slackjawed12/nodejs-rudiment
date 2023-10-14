import express from "express";
const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("index", { title: "express" });
  res.locals.comment = "good";
});
export default router;
