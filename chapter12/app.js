const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const nunjucks = require("nunjucks");
const dotenv = require("dotenv");
const ColorHash = require("color-hash").default;
dotenv.config();
const webSocket = require("./socket");
const indexRouter = require("./routes");
const connect = require("./schemas");

const app = express();
app.set("port", process.env.PORT || 8005);
app.set("view engine", "html"),
  nunjucks.configure("views", {
    express: app,
    watch: true,
  });
connect();

// app과 socket 간 session 미들웨어 공유하기 위해 변수로 분리
const sessionMiddleware = session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
});

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);

app.use((req, res, next) => {
  if (!req.session.color) {
    const colorHash = new ColorHash();
    // 세션아이디를 HEX 형식 색상문자열로 변경시킨 후 session 객체에 저장
    req.session.color = colorHash.hex(req.sessionID);
    console.log(
      "set session color hash... : ",
      req.session.color,
      req.sessionID
    );
  }
  next();
});

app.use("/", indexRouter);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});
app.use(sessionMiddleware);

const server = app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});

webSocket(server, app, sessionMiddleware);
