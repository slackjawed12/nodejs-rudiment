import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { afterUploadImage, uploadPost } from "../controllers/post.js";
import { isLoggedIn } from "../middlewares/index.js";

const router = express.Router();

try {
  fs.readdirSync("uploads");
} catch (error) {
  console.error("uploads 폴더가 없어 uploads 폴더를 생성합니다.");
  fs.mkdirSync("uploads");
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "uploads/");
    },
    filename(req, file, cb) {
      const encodedName = Buffer.from(file.originalname, "latin1").toString(
        "utf8"
      );
      const ext = path.extname(encodedName);
      cb(null, path.basename(encodedName, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.post("/img", isLoggedIn, upload.single("img"), afterUploadImage);

const upload2 = multer();
router.post("/", isLoggedIn, upload2.none(), uploadPost);

export default router;
