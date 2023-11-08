import express from "express";
import { renderLogin, createDomain } from "../controllers/index.js";
import { isLoggedIn } from "../middlewares/index.js";

const router = express.Router();

router.get("/", renderLogin);
router.post("/domain", isLoggedIn, createDomain);

export default router;
