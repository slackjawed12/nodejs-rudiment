import axios from "axios";

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

export { test };
