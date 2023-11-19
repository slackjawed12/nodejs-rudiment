import express from "express";
import { verifyToken, apiLimiter } from "../middlewares/index.js";
import { createToken, tokenTest } from "../controllers/v2.js";
import { getMyPosts, getPostsByHashtag } from "../controllers/v2.js";
import cors from "cors";
const router = express.Router();

router.post("/token", apiLimiter, createToken);

router.get("/test", apiLimiter, verifyToken, tokenTest);

router.get("/posts/my", apiLimiter, verifyToken, getMyPosts);

router.get("/posts/hashtag/:tite", apiLimiter, verifyToken, getPostsByHashtag);

router.use(
  cors({
    credentials: true,
  })
);
export default router;
