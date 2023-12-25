const express = require("express");
const { isLoggedIn } = require("../middlewares/index.js");
const { follow, deleteFollow } = require("../controllers/user.js");

const router = express.Router();

router.post("/:id/follow", isLoggedIn, follow);
router.delete("/:id/follow", isLoggedIn, deleteFollow);
export default router;
