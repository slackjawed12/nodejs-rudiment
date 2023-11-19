import express from "express";
import {
  verifyToken,
  apiLimiter,
  corsWhenDomainMatches,
} from "../middlewares/index.js";
import { createToken, tokenTest } from "../controllers/v2.js";
import { getMyPosts, getPostsByHashtag } from "../controllers/v2.js";
const router = express.Router();

router.use(corsWhenDomainMatches);

router.post("/token", apiLimiter, createToken);

router.get("/test", apiLimiter, verifyToken, tokenTest);

router.get("/posts/my", apiLimiter, verifyToken, getMyPosts);

router.get("/posts/hashtag/:tite", apiLimiter, verifyToken, getPostsByHashtag);

export default router;
