const fs = require("fs");

// 비동기 방식으로 순서를 유지한다.
console.log("시작");
fs.readFile("chapter3/src/fs/readme2.txt", (err, data) => {
  if (err) {
    throw err;
  }
  console.log("1번", data.toString());
  fs.readFile("chapter3/src/fs/readme2.txt", (err, data) => {
    if (err) {
      throw err;
    }
    console.log("2번", data.toString());
    fs.readFile("chapter3/src/fs/readme2.txt", (err, data) => {
      if (err) {
        throw err;
      }
      console.log("3번", data.toString());
      console.log("끝");
    });
  });
});