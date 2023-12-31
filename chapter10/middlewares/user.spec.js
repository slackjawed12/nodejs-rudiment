jest.mock("../models/user");
const { follow } = require("../controllers/user.js");
const User = require("../models/user.js");
describe("follow", () => {
  const req = {
    user: { id: 1 },
    params: { id: 2 },
  };
  const res = {
    status: jest.fn(() => res),
    send: jest.fn(),
  };
  const next = jest.fn();

  test("사용자를 찾아 팔로잉을 추가하고 success를 응답한다.", async () => {
    User.findOne.mockReturnValue({
      addFollowing(id) {
        return Promise.resolve(true);
      },
    });
    await follow(req, res, next);
    expect(res.send).toBeCalledWith("success");
  });

  test("사용자를 못 찾으면 오류를 반환한다.", async () => {
    User.findOne.mockReturnValue(null);
    await follow(req, res, next);
    expect(res.status).toBeCalledWith(404);
    expect(res.send).toBeCalledWith("no user");
  });

  test("데이터베이스 에러가 발생하면 오류를 반환한다.", async () => {
    const message = "DB에러";
    User.findOne.mockReturnValue(Promise.reject(message));
    await follow(req, res, next);
    expect(next).toBeCalledWith(message);
  });
});
