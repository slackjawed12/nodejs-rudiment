const fs = require("fs");

// node 명령어를 실행하는 콘솔 기준 경로로 명시해야 한다.
fs.readFile("chapter3/src/fs/readme.txt", (err, data) => {
  if (err) {
    throw err;
  }
  console.log(data); // readFile의 결과물은 buffer 형식이다.
  console.log(data.toString()); // toString으로 버퍼를 문자열로 변환
});
