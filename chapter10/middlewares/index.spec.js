const { isLoggedIn, isNotLoggedIn } = require("./index.js");

describe("isLoggedIn", () => {
  const res = {
    // status는 chaining 해야하므로 res 반환으로 mock
    status: jest.fn(() => res),
    send: jest.fn(),
  };
  const next = jest.fn();
  test("로그인되어 있으면 next를 호출한다.", () => {
    const req = {
      isAuthenticated: jest.fn(() => true),
    };
    isLoggedIn(req, res, next);
    // toBeCalledTimes : 몇번 호출되었는지
    expect(next).toBeCalledTimes(1);
  });
  test("로그인되어 있지 않으면 에러를 응답한다.", () => {
    const req = {
      isAuthenticated: jest.fn(() => false),
    };
    isLoggedIn(req, res, next);
    // toBeCalledWith : 특정 인수와 함께 호출되었는지
    expect(res.status).toBeCalledWith(403);
    expect(res.send).toBeCalledWith("로그인 필요");
  });
});
describe("isNotLoggedIn", () => {
  const res = {
    redirect: jest.fn(),
  };
  const next = jest.fn();
  test("로그인되어 있으면 에러를 응답한다.", () => {
    const req = {
      isAuthenticated: jest.fn(() => true),
    };
    isNotLoggedIn(req, res, next);
    const message = encodeURIComponent("로그인한 상태입니다.");
    expect(res.redirect).toBeCalledWith(`/?error=${message}`);
  });
  test("로그인되어 있지 않으면 next를 호출한다.", () => {
    const req = {
      isAuthenticated: jest.fn(() => false),
    };
    isNotLoggedIn(req, res, next);
    expect(next).toHaveBeenCalledTimes(1);
  });
});
