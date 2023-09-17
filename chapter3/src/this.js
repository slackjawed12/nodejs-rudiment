const assert = require("assert");
// node에서 this는 module.exports(exports 객체, {})를 가리킨다.
console.log(this);
console.log(assert(this === module.exports));
console.log(assert(this === exports));
console.log(assert(exports === module.exports));

// 함수 내부의 his는 global 객체를 가리킨다.
function thisInFunction() {
  console.log("function in this :", this === global);
  console.log(global);
}

thisInFunction();
