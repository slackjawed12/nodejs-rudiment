import passport from "passport";
import local from "./localStrategy.js";
import kakao from "./kakaoStrategy.js";
import User from "../models/user.js";

export default () => {
  // 로그인 시 실행된다. req.session 객체에 저장할 데이터를 결정
  // user id만 세션에 저장
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  // 매 요청마다 실행된다. passport.session 미들웨어가 호출
  // 첫번째 인수가 serializeUser가 저장했던 아이디
  passport.deserializeUser((id: number, done) => {
    User.findOne({
      where: { id },
      include: [
        {
          model: User,
          attributes: ["id", "nick"],
          as: "Followers",
        },
        {
          model: User,
          attributes: ["id", "nick"],
          as: "Followings",
        },
      ],
    })
      .then((user) => done(null, user)) // req.user에 유저 정보 할당
      .catch((err) => done(err));
  });

  local();
  kakao();
};
