// require 함수에서 모듈 경로 지정. 확장자 생략 가능
// 구조분해할당 문법
const { odd, even } = require("./var");

function checkOddOrEven(num) {
  if (num % 2) {
    return odd;
  }
  return even;
}

module.exports = checkOddOrEven;
