import express from "express";
const router = express.Router();

router.get(
  "/jumper",
  (req, res, next) => {
    next("route");
  },
  (req, res, next) => {
    console.log("첫 번째 미들웨어");
    next();
  },
  (req, res, next) => {
    console.log("두 번째 미들웨어");
    next();
  }
);
router.get("/jumper", (req, res) => {
  console.log("주소가 같은 다음 라우터가 실행된다.");
  res.send("hello, next");
});

export default router;
