import jwt from "jsonwebtoken";
import db from "../models/index.js";
const { User, Domain } = db;
/**
 * 토큰을 발급한다.
 */
const createToken = async (req, res) => {
  const { clientSecret } = req.body;
  try {
    const domain = await Domain.findOne({
      where: { clientSecret },
      include: {
        model: User,
        attribute: ["nick", "id"],
      },
    });
    if (!domain) {
      return res.status(401).json({
        code: 401,
        message: "등록되지 않은 도메인입니다. 먼저 도메인을 등록하세요.",
      });
    }
    /**
     * jwt.sign 메서드
     * 첫 번째 인수 : 토큰 내용
     * 두 번째 인수 : 토큰 비밀 키
     * 세 번째 인수 : 토큰 설정 - 만료시간, 발급자 등
     */
    const token = jwt.sign(
      {
        id: domain.User.id,
        nick: domain.User.nick,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1m",
        issuer: "nodebird",
      }
    );
    return res.json({
      code: 200,
      message: "토큰이 발급되었습니다.",
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: "서버 에러",
    });
  }
};

/**
 * 토큰 테스트
 */
const tokenTest = (req, res) => {
  res.json(res.locals.decoded);
};

export { createToken, tokenTest };
