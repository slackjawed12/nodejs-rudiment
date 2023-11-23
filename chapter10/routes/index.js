const express = require("express");
const { renderLogin, createDomain } = require("../controllers/index.js");
const { isLoggedIn } = require("../middlewares/index.js");

const router = express.Router();

router.get("/", renderLogin);
router.post("/domain", isLoggedIn, createDomain);

module.exports = router;
