const fs = require("fs");

// 파일, 폴더의 변경 사항을 감지한다.
// change 이벤트, rename 이벤트 발생
// change 이벤트는 두 번씩 발생하기도 한다.
fs.watch("chapter3/src/fs/target.txt", (eventType, filename) => {
  console.log(eventType, filename);
});
