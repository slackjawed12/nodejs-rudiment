const fs = require("fs");

// createdReadStream : 읽기 스트림을 생성한다.
const readStream = fs.createReadStream("chapter3/src/fs/readme3.txt", {
  highWaterMark: 16,
});
const data = [];

readStream.on("data", (chunk) => {
  data.push(chunk);
  console.log("data : ", chunk, chunk.length);
});

readStream.on("end", () => {
  console.log("end : ", Buffer.concat(data).toString());
});

readStream.on("error", (err) => {
  console.log("error : ", err);
});
