import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const URL = process.env.API_URL;
axios.defaults.headers.origin = process.env.ORIGIN;

const test = async (req, res, next) => {
  try {
    // 토큰이 없으면 발급 요청
    if (!req.session.jwt) {
      const tokenResult = await axios.post("http://localhost:8002/v1/token", {
        clientSecret: process.env.CLIENT_SECRET,
      });
      if (tokenResult.data?.code === 200) {
        // 토큰 발급 성공 시 세션에 토큰 저장
        req.session.jwt = tokenResult.data.token;
      } else {
        // 발급 실패 시 에러 메시지 응답
        return res.json(tokenResult.data);
      }
    }

    const result = await axios.get("http://localhost:8002/v1/test", {
      headers: { authorization: req.session.jwt },
    });
    return res.json(result.data);
  } catch (err) {
    console.error(err);
    if (err.response?.status === 419) {
      return res.json(err.response.data);
    }
    return next(err);
  }
};

/**
 * api 서버에 요청을 보낸다.
 * @param req : 요청객체
 * @param api : api url endpoint
 */
const request = async (req, api) => {
  try {
    console.log("jwt", req.session.jwt);
    if (!req.session.jwt) {
      const tokenResult = await axios.post(`${URL}/token`, {
        clientSecret: process.env.CLIENT_SECRET,
      });
      req.session.jwt = tokenResult.data.token;
    }
    console.log(URL, api);
    return await axios.get(`${URL}${api}`, {
      headers: {
        authorization: req.session.jwt,
      },
    });
  } catch (error) {
    // 토큰 지우고 request 재귀호출
    if (error.response?.status === 419) {
      delete req.session.jwt;
      return request(req, api);
    }
    return error.response;
  }
};

const getMyPosts = async (req, res, next) => {
  try {
    const result = await request(req, "/posts/my");
    res.json(result.data);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const searchByHashtag = async (req, res, next) => {
  try {
    const result = await request(
      req,
      `/posts/hashtag/${encodeURIComponent(req.params.hashtag)}`
    );
    res.json(result.data);
  } catch (error) {
    if (error.code) {
      console.error(error);
      next(error);
    }
  }
};

const renderMain = (req, res) => {
  res.render("main", { key: process.env.CLIENT_SECRET });
};

export { test, request, getMyPosts, searchByHashtag, renderMain };
