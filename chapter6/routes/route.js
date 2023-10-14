import express from "express";

const router = express.Router();

// Router 객체의 route 메서드 활용법 - endpoint가 같고 메서드가 다른 API를 한 번에 처리하기 편하다.
router
  .route("/foo")
  .get((req, res) => {
    res.send("this is GET /foo");
  })
  .post((req, res) => {
    res.send("this is POST /foo");
  });
