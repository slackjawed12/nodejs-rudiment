import { describe } from "node:test";
import { isLoggedIn, isNotLoggedIn } from "./index.js";
import { jest } from "@jest/globals";

describe("isLoggedIn", () => {
  const res = {
    status: jest.fn(() => res),
    send: jest.fn(),
  };
  const next = jest.fn();
  test("로그인되어 있으면 next를 호출한다.", () => {
    const req = {
      isAuthenticated: jest.fn(() => true),
    };
    isLoggedIn(req, res, next);
    expect(next).toBeCalledTimes(1);
  });
  test("로그인되어 있지 않으면 에러를 응답한다.", () => {
    const req = {
      isAuthenticated: jest.fn(() => false),
    };
    isLoggedIn(req, res, next);
    expect(res.status).toBeCalledWith(403);
    expect(res.send).toBeCalledWith("로그인 필요");
  });
});
describe("isNotLoggedIn", () => {
  test("로그인되어 있으면 에러를 응답한다.", () => {});
  test("로그인되어 있지 않으면 next를 호출한다.", () => {});
});
