import express from "express";
import { isLoggedIn } from "../middlewares/index.js";
import { follow, deleteFollow } from "../controllers/user.js";

const router = express.Router();

router.post("/:id/follow", isLoggedIn, follow);
router.delete("/:id/follow", isLoggedIn, deleteFollow);
export default router;
