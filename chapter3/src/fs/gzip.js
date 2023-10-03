const zlib = require("zlib");
const fs = require("fs");

const readStream = fs.createReadStream("chapter3/src/fs/readme4.txt");
const zlibStream = zlib.createGzip();
const writeStream = fs.createWriteStream("chapter3/src/fs/readme4.txt.gz");
readStream.pipe(zlibStream).pipe(writeStream);
