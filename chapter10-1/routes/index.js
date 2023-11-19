import express from "express";
import {
  test,
  getMyPosts,
  searchByHashtag,
  renderMain,
} from "../controllers/index.js";

const router = express.Router();

router.get("/test", test);

router.get("/myposts", getMyPosts);

router.get("/search/:hashtag", searchByHashtag);

router.get("/", renderMain);

export default router;
