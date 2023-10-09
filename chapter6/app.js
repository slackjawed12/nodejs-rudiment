import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import session from "express-session";
import dotenv from "dotenv";
import path from "path";
// ES module 사용 목적으로 "type" : module 사용 시 __dirname, __filename 사용 불가
import { fileURLToPath } from "url";
dotenv.config();
const app = express();
// import.meta.url 사용
const __dirname = fileURLToPath(new URL(".", import.meta.url));
const __filename = fileURLToPath(import.meta.url);

app.set("port", process.env.PORT || 3000);

app.use(morgan("dev"));
app.use("/", express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
    name: "session-cookie",
  })
);

// 인자 : 모든 요청에 실행되는 미들웨어
app.use((req, res, next) => {
  console.log("all req");
  next(); // 다음 미들웨어로
});

app.get("/cookie", (req, res, next) => {
  res.cookie("name", "myname", {
    expires: new Date(Date.now() + 90000000),
    httpOnly: true,
    secure: true,
    signed: true,
  });
  return res.json({});
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.message);
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});
