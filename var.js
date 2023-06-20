// const odd = "cjs odd";
// const even = "cjs even";

// module.exports : 변수들을 담은 객체
// 파일이 모듈로 기능하게 됨
// module.exports = {
//   odd,
//   even,
// };

// 각 변수를 exports 객체에 하나씩 할당
console.log(module.exports === exports);

exports.odd = "cjs 짝";
exports.even = "cjs 홀";
