import bcrypt from "bcrypt";
import passport from "passport";
import db from "../models/index.js";
const { User } = db;

export const join = async (req, res, next) => {
  const { email, nick, password } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      return res.redirect("/join?error=exist");
    }
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      email,
      nick,
      password: hash,
    });
    return res.redirect("/");
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

// passport는 req 객체에 login, logout 메서드를 추가한다.
// req.login : passport.serializeUser 호출
export const login = (req, res, next) => {
  // local 로그인 전략 수행 - 중첩 미들웨어
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }

    if (!user) {
      return res.redirect(`/?loginError=${info.message}`);
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.redirect("/");
    });
  })(req, res, next);
};

// req.logout : req.user, req.session 객체 제거 + 제거 이후 콜백 실행
export const logout = (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
};
