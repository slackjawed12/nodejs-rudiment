const fs = require("fs").promises;

// 프로미스의 에러를 캐치하면 프로세스가 종료되지 않는다.
setInterval(() => {
  fs.unlink("./nodnf.js").catch(console.error);
}, 1000);
