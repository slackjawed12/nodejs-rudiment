import { RequestHandler, Request, Response } from "express";
import jwt from "jsonwebtoken";
import rateLimit from "express-rate-limit";
import cors from "cors";
import Domain from "../models/domain";

/**
 * 라우터 접근 권한 제어 : 로그인한 상태만 필터링하는 미들웨어
 */
const isLoggedIn: RequestHandler = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).send("로그인 필요");
  }
};

const isNotLoggedIn: RequestHandler = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    const message = encodeURIComponent("로그인한 상태입니다.");
    res.redirect(`/?error=${message}`);
  }
};

const verifyToken: RequestHandler = (req, res, next) => {
  try {
    res.locals.decoded = jwt.verify(
      req.headers.authorization ?? "",
      process.env.JWT_SECRET ?? ""
    );
    return next();
  } catch (error) {
    if (error instanceof Error && error.name === "TokenExpiredError") {
      return res.status(419).json({
        code: 419,
        message: "토큰이 만료되었습니다.",
      });
    }
    return res.status(401).json({
      code: 401,
      message: "유효하지 않은 토큰입니다.",
    });
  }
};

const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  handler(req: Request, res: Response) {
    res.status(this.statusCode!).json({
      code: this.statusCode,
      message: "1분에 한 번만 요청할 수 있습니다.",
    });
  },
});

const deprecated = (req: Request, res: Response) => {
  res.status(410).json({
    code: 410,
    message: "새로운 버전이 나왔습니다. 새로운 버전을 사용하세요.",
  });
};

/**
 * Access-Control-Allow-Origin을 *로 설정하면서 생긴 문제
 * - 클라이언트 비밀키를 통해 다른 도메인이 api 서버에 요청을 보낼 수 있다.
 * - 발급 시 허용한 도메인이 db에 저장되어 있으므로, host 헤더와 비밀키가 모두 일치한 경우에만 cors 허용하도록 수정
 */
const corsWhenDomainMatches: RequestHandler = async (req, res, next) => {
  const domain = await Domain.findOne({
    where: {
      host: new URL(req.get("origin")!).host,
    },
  });
  if (domain) {
    cors({
      origin: req.get("origin"),
      credentials: true,
    })(req, res, next);
  } else {
    next();
  }
};

export {
  isLoggedIn,
  isNotLoggedIn,
  verifyToken,
  apiLimiter,
  deprecated,
  corsWhenDomainMatches,
};
