import express, { ErrorRequestHandler, json, urlencoded } from "express";
import { join } from "path";
import cookieParser from "cookie-parser";
import { initialize, session as _session } from "passport";
import morgan from "morgan";
import session from "express-session";
import nunjucks from "nunjucks";
import dotenv from "dotenv";
import authRouter from "./routes/auth.js";
import postRouter from "./routes/post.js";
import userRouter from "./routes/user.js";
import pageRouter from "./routes/page.js";
import v1 from "./routes/v1.js";
import v2 from "./routes/v2.js";
import { sequelize } from "./models/index.js";
import passportConfig from "./passport/index.js";
import { error as _error } from "./logger.js";
import helmet from "helmet";
import hpp from "hpp";
import { createClient } from "redis";
import RedisStore from "connect-redis";

dotenv.config();
const app = express();
passportConfig();
app.set("port", process.env.PORT || 8002);
app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
  watch: true,
});

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });

if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined"));
  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false,
      crossOriginResourcePolicy: false,
    })
  );
} else {
  app.use(morgan("dev"));
  app.use(hpp());
}

const redisClient = createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  password: process.env.REDIS_PASSWORD,
  legacyMode: true,
});

redisClient.connect().catch(console.error);
app.use(express.static(join(__dirname, "public")));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
const sessionOption = {
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET!,
  cookie: {
    httpOnly: true,
    secure: false,
  },
  // redis store에 세션을 저장
  store: new RedisStore({ client: redisClient }),
  proxy: false,
};

if (process.env.NODE_ENV === "production") {
  sessionOption.proxy = true;
}

app.use(session(sessionOption));

app.use(initialize());
app.use(_session());

app.use("/v1", v1);
app.use("/v2", v2);
app.use("/auth", authRouter);
app.use("/post", postRouter);
app.use("/user", userRouter);
app.use("/", pageRouter);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  _error(error.message);
  next(error);
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500);
  res.render("error");
};

app.use(errorHandler);
export default app;
