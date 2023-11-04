import express from "express";
import { isLoggedIn, isNotLoggedIn } from "../middlewares/index.js";
import {
  renderProfile,
  renderJoin,
  renderMain,
  renderHashtag,
} from "../controllers/page.js";

const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.followerCount = req.user?.Followers?.length || 0;
  res.locals.followingCount = req.user?.Followings?.length || 0;
  res.locals.followingIdList = req.user?.Followings?.map((f) => f.id) || [];
  next();
});

router.get("/", renderMain);
router.get("/profile", isLoggedIn, renderProfile);
router.get("/join", isNotLoggedIn, renderJoin);
router.get("/hashtag", renderHashtag);

export default router;
