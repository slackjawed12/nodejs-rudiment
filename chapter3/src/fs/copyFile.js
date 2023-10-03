const fs = require("fs").promises;

fs.copyFile("chapter3/src/fs/readme4.txt", "chapter3/src/fs/writeme4.txt")
  .then(() => {
    console.log("복사 완료");
  })
  .catch((error) => {
    console.error(error);
  });
