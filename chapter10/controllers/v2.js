import jwt from "jsonwebtoken";
import db from "../models/index.js";
const { User, Domain, Post, Hashtag } = db;
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
        expiresIn: "30m",
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

/**
 * 유저 아이디로 게시글 조회
 */
const getMyPosts = (req, res) => {
  Post.findAll({
    where: {
      userId: res.locals.decoded.id,
    },
  })
    .then((posts) => {
      console.log(posts);
      res.json({
        code: 200,
        payload: posts,
      });
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).json({
        code: 500,
        message: "서버 에러",
      });
    });
};

const getPostsByHashtag = async (req, res) => {
  try {
    const hashtag = await Hashtag.findOne({
      where: { title: req.params.title },
    });
    if (!hashtag) {
      return res.status(404).json({
        code: 404,
        message: "검색 결과가 없습니다.",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: "서버 에러",
    });
  }
};

export { createToken, tokenTest, getMyPosts, getPostsByHashtag };
