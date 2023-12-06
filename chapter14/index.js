#!/usr/bin/env node
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("예제가 재미있습니까? (y/n) ", (answer) => {
  if (answer === "y") {
    console.log("감사합니다!");
  } else if (answer === "n") {
    console.log("죄송합니다.");
  } else {
    console.log("y 또는 n만 입력하세요.");
  }
  rl.close();
});

// console.log("Hello CLI", process.argv);
