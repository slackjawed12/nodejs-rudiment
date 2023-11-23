const express = require("express");
const {
  verifyToken,
  apiLimiter,
  corsWhenDomainMatches,
} = require("../middlewares/index.js");
const { createToken, tokenTest } = require("../controllers/v2.js");
const { getMyPosts, getPostsByHashtag } = require("../controllers/v2.js");
const router = express.Router();

// router.use : 라우터 간의 공통 로직 적용 시
router.use(corsWhenDomainMatches);

router.post("/token", apiLimiter, createToken);

router.get("/test", apiLimiter, verifyToken, tokenTest);

router.get("/posts/my", apiLimiter, verifyToken, getMyPosts);

router.get("/posts/hashtag/:tite", apiLimiter, verifyToken, getPostsByHashtag);

module.exports = router;
