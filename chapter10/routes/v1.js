import express from "express";
import { deprecated, verifyToken } from "../middlewares/index.js";
import { createToken, tokenTest } from "../controllers/v1.js";
import { getMyPosts, getPostsByHashtag } from "../controllers/v1.js";
const router = express.Router();

// v1은 deprecated
router.use(deprecated);

router.post("/token", createToken);

router.get("/test", verifyToken, tokenTest);

router.get("/posts/my", verifyToken, getMyPosts);

router.get("/posts/hashtag/:tite", verifyToken, getPostsByHashtag);

export default router;