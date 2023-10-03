const fs = require("fs");
const file = fs.createWriteStream("chapter3/src/fs/big.txt");

for (let i = 0; i <= 10000000; i++) {
  file.write("안녕하세요. 엄청나게 큰 파일을 만들고 있습니다.\n");
}
file.end();
