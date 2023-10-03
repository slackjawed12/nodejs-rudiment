const fs = require("fs");

console.log("before : ", process.memoryUsage().rss);

const readStream = fs.createReadStream("chapter3/src/fs/big.txt");
const writeStream = fs.createWriteStream("chapter3/src/fs/big2.txt");
readStream.pipe(writeStream);

readStream.on("end", () => {
  console.log("stream : ", process.memoryUsage().rss);
});
// 3842080, 102449152 -> 약 3 배 차이
