import { pipeline } from "stream/promises";
import zlib from "zlib";
import fs from "fs";

const ac = new AbortController();
const signal = ac.signal;

// 1ms 후에 중단
setTimeout(() => ac.abort(), 1);

// pipeline 마지막 인수로 AbortSignal이 들어갈 수 있다.
await pipeline(
  fs.createReadStream("chapter3/src/fs/readme4.txt"),
  zlib.createGzip(),
  fs.createWriteStream("chapter3/src/fs/readme4.txt.gz"),
  { signal }
);
