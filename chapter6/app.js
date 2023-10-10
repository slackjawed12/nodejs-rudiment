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
    resave: false, // 요청 시 세션 수정사항 없어도 세션을 다시 저장할지 여부
    saveUninitialized: false, // 세션에 저장할 내역이 없어도 처음부터 세션을 생성할지 여부
    secret: process.env.COOKIE_SECRET, // 세션쿠키 서명에 사용될 비밀키
    // 세션쿠키 설정
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
  console.log(req.signedCookies);
  res.cookie("name", "myname", {
    expires: new Date(Date.now() + 90000000),
    httpOnly: true,
    secure: true,
    signed: true,
  });
  res.clearCookie("good", { httpOnly: true, secure: true });
  return res.json({});
});

app.get("/session", (req, res, next) => {
  req.session.name = "slackjawed";
  // console.log(req.sessionID);
  req.session.destroy();
  return res.json({});
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.message);
});

app.use(
  "/locals",
  (req, res, next) => {
    res.locals.data = "삽입된 로컬데이터";
    next();
  },
  (req, res, next) => {
    res.json(res.locals.data);
  }
);

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});
