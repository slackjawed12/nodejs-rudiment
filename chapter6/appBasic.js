import express from "express";

const app = express();

app.set("port", process.env.PORT || 3000);

// 인자 : 모든 요청에 실행되는 미들웨어
app.use((req, res, next) => {
  console.log("all req");
  next(); // 다음 미들웨어로
});

app.get(
  "/",
  (req, res, next) => {
    console.log("only GET /");
    next();
  },
  (req, res) => {
    throw new Error("error test");
  }
);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.message);
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});
