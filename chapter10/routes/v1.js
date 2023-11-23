const express = require("express");
const { deprecated, verifyToken } = require("../middlewares/index.js");
const { createToken, tokenTest } = require("../controllers/v1.js");
const { getMyPosts, getPostsByHashtag } = require("../controllers/v1.js");
const router = express.Router();

// v1은 deprecated
router.use(deprecated);

router.post("/token", createToken);

router.get("/test", verifyToken, tokenTest);

router.get("/posts/my", verifyToken, getMyPosts);

router.get("/posts/hashtag/:tite", verifyToken, getPostsByHashtag);

module.exports = router;
