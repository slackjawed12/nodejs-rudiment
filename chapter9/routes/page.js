import express from "express";
import { isLoggedIn, isNotLoggedIn } from "../middlewares/index.js";
import { renderProfile, renderJoin, renderMain } from "../controllers/page.js";

const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.followerCount = 0;
  res.locals.followingCount = 0;
  res.locals.followingIdList = [];
  next();
});

router.get("/", renderMain);
router.get("/profile", isLoggedIn, renderProfile);
router.get("/join", isNotLoggedIn, renderJoin);

export default router;
