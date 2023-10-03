const fs = require("fs");

setInterval(() => {
  // 노드 내장 모듈의 에러는 프로세스를 중단시키지 않는다.
  fs.unlink("./abcdefg.js", (err) => {
    if (err) {
      console.error(err);
      // throw 하면 멈춘다.
      // throw new Error(err);
    }
  });
}, 1000);
