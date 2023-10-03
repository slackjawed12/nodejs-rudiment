const fs = require("fs");

console.log("before : ", process.memoryUsage().rss);

const data1 = fs.readFileSync("chapter3/src/fs/big.txt");
fs.writeFileSync("chapter3/src/fs/big2.txt", data1);
console.log("buffer : ", process.memoryUsage().rss);
// 39354368, 720519168 : 약 15배 정도 차이
