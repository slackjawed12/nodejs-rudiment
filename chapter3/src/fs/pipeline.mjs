import { pipeline } from "stream/promises";
import zlib from "zlib";
import fs from "fs";

// stream 모듈의 pipeline 메서드로 파이프라이닝
await pipeline(
  fs.createReadStream("chapter3/src/fs/readme4.txt"),
  zlib.createGzip(),
  fs.createWriteStream("chapter3/src/fs/readme4.txt.gz")
);
