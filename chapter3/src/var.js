const odd = "CJS 홀수입니다";
const even = "CJS 짝수입니다";
// exports 변수와 module.exports 참조가 달라진다.
exports.etc = "기타 변수";
module.exports = {
  odd,
  even,
};

// console.log(exports, module.exports);
