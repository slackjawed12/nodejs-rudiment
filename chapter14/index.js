#!/usr/bin/env node
const readline = require("readline");

// rl 객체 생성
const rl = readline.createInterface({
  input: process.stdin, // 콘솔 입력 스트림
  output: process.stdout, // 콘솔 출력 스트림
});

// 두 번째 인수 콜백 : 사용자 입력 인자(answer)로 받고 출력
// rl.question("예제가 재미있습니까? (y/n) ", (answer) => {
//   if (answer === "y") {
//     console.log("감사합니다!");
//   } else if (answer === "n") {
//     console.log("죄송합니다.");
//   } else {
//     console.log("y 또는 n만 입력하세요.");
//   }
//   rl.close();
// });

// y, n 입력하지 않았을 경우 종료되지 않고 다시 입력
console.clear();
const answerCallback = (answer) => {
  if (answer === "y") {
    console.log("감사합니다!");
    rl.close();
  } else if (answer === "n") {
    console.log("죄송합니다.");
    rl.close();
  } else {
    console.clear();
    console.log("y 또는 n만 입력하세요.");
    rl.question("예제는 재미있습니까? (y/n) ", answerCallback);
  }
};

rl.question("예제가 재미있습니까? (y/n) ", answerCallback);
