import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import session from "express-session";
import dotenv from "dotenv";
import path from "path";
// ES module 사용 목적으로 "type" : module 사용 시 __dirname, __filename 사용 불가
import { fileURLToPath } from "url";
import multer from "multer";
import fs from "fs";
import indexRouter from "./routes/index.js";
import userRouter from "./routes/user.js";
import nextRouter from "./routes/next.js";
import pugRouter from "./routes/pug.js";

try {
  fs.readdirSync("uploads");
} catch (error) {
  console.log("uploads 폴더가 없어 uploads 폴더를 생성합니다.");
  fs.mkdirSync("uploads");
}
dotenv.config();
const app = express();
// import.meta.url 사용
const __dirname = fileURLToPath(new URL(".", import.meta.url));
const __filename = fileURLToPath(import.meta.url);

app.set("port", process.env.PORT || 3000);
// 템플릿 파일 위치 폴더 지정 - res.render 메서드의 기준 path가 됨
app.set("views", path.join(__dirname, "views"));
// 템플릿 엔진 설정
app.set("view engine", "pug");

app.use((req, res, next) => {
  if (process.env.NODE_ENV === "production") {
    morgan("combined")(req, res, next);
  } else {
    morgan("dev")(req, res, next);
  }
});

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

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "uploads/");
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

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

app.get("/upload", (req, res, next) => {
  try {
    res.sendFile(path.join(`${__dirname}/public`, "multipart.html"));
  } catch (e) {
    next(e);
  }
});

app.post("/upload", upload.single("image"), (req, res) => {
  console.log(req.file);
  console.log(req.body);
  res.send("ok");
});
app.post("/upload/array", upload.array("images"), (req, res) => {
  console.log(req.files);
  console.log(req.body);
  res.send("ok");
});

app.post(
  "/upload/fields",
  upload.fields([{ name: "image1" }, { name: "image2" }]),
  (req, res) => {
    console.log(req.files);
    console.log(req.body);
    res.send("ok");
  }
);
app.post("/upload/none", upload.none(), (req, res) => {
  console.log(req.body);
  res.send("ok");
});

app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/next", nextRouter);
app.use("/pug", pugRouter);

app.use((req, res, next) => {
  res.status(404).send("Not Found");
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render("error", { message: err.message, error: err });
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});
