import express from "express";
import { test, getMyPosts, searchByHashtag } from "../controllers/index.js";

const router = express.Router();

router.get("/test", test);

router.get("/myposts", getMyPosts);

router.get("/search/:hashtag", searchByHashtag);

export default router;
