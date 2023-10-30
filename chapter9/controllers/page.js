const renderProfile = (req, res) => {
  res.render("profile", { title: "내 정보 - NodeBird" });
};

const renderJoin = (req, res) => {
  res.render("join", { title: "회원 가입 - NodeBird" });
};

const renderMain = (req, res, next) => {
  const twits = [];
  res.render("main", {
    title: "NodeBird",
    twits,
  });
};

export { renderProfile, renderJoin, renderMain };
