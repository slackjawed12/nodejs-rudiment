const util = require("util");
const crypto = require("crypto");

// 함수가 deprecated 처리됐음을 알린다.
// 첫번째 인수 : 함수, 두 번째 인수 : 경고 메시지
const dontUseMe = util.deprecate((x, y) => {
  console.log(x + y);
}, "dontUseMe 함수는 deprecated 되었으니 더 이상 사용하지 마세요");
dontUseMe(1, 2);

// util.promisify : 콜백 패턴을 프로미스 패턴으로 바꾼다.
const randomBytesPromise = util.promisify(crypto.randomBytes);
randomBytesPromise(64)
  .then((buf) => {
    console.log("buf.toString(base64):", buf.toString("base64"));
  })
  .catch((error) => {
    console.error(error);
  });
