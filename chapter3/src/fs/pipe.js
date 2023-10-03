const fs = require("fs");

const readStream = fs.createReadStream("chapter3/src/fs/readme4.txt");
const writeStream = fs.createWriteStream("chapter3/src/fs/writeme3.txt");
readStream.pipe(writeStream);
