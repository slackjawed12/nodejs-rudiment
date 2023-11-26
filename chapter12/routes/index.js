const express = require("express");
const {
  renderRoom,
  renderMain,
  enterRoom,
  removeRoom,
  createRoom,
} = require("../controllers");
const router = express.Router();

router.get("/", renderMain);

router.get("/room", renderRoom);

router.post("/room", createRoom);

router.get("/room/:id", enterRoom);

router.delete("/room/:id", removeRoom);

module.exports = router;
