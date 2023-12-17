const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { afterUploadImage, uploadPost } = require("../controllers/post.js");
const { isLoggedIn } = require("../middlewares/index.js");
const router = express.Router();
const { S3Client } = require("@aws-sdk/client-s3");
const multerS3 = require("multer-s3");

try {
  fs.readdirSync("uploads");
} catch (error) {
  console.error("uploads 폴더가 없어 uploads 폴더를 생성합니다.");
  fs.mkdirSync("uploads");
}

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
  region: "ap-northeast-2",
});

const uploadV2 = multer({
  storage: multerS3({
    s3,
    bucket: "slackjawed-node-practice-bucket",
    key(req, file, cb) {
      cb(null, `original/${Date.now()}_${file.originalname}`);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

// const upload = multer({
//   storage: multer.diskStorage({
//     destination(req, file, cb) {
//       cb(null, "uploads/");
//     },
//     filename(req, file, cb) {
//       const encodedName = Buffer.from(file.originalname, "latin1").toString(
//         "utf8"
//       );
//       const ext = path.extname(encodedName);
//       cb(null, path.basename(encodedName, ext) + Date.now() + ext);
//     },
//   }),
//   limits: { fileSize: 5 * 1024 * 1024 },
// });

router.post("/img", isLoggedIn, upload.single("img"), afterUploadImage);

const upload2 = multer();
router.post("/", isLoggedIn, upload2.none(), uploadPost);

export default router;
