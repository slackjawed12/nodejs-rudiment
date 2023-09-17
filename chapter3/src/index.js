const { odd, even } = require("./var");
const checkNumber = require("./func");

console.log(odd);
console.log(even);
function checkStringOddOrEven(str) {
  if (str.length % 2) {
    return odd;
  }
  return even;
}

console.log(checkNumber(10));
console.log(checkStringOddOrEven("hello"));
