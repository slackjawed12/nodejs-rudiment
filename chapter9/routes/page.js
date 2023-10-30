import express from "express";
import { renderProfile, renderJoin, renderMain } from "../controllers/page.js";

const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = null;
  res.locals.followerCount = 0;
  res.locals.followingCount = 0;
  res.locals.followingIdList = [];
  next();
});

router.get("/", renderMain);
router.get("/profile", renderProfile);
router.get("/join", renderJoin);

export default router;
