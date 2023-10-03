const crypto = require("crypto");

const pass = "pass";
const salt = "salt";
const start = Date.now();

crypto.pbkdf2(pass, salt, 1000000, 128, "sha512", () => {
  console.log("1:", Date.now() - start);
});
crypto.pbkdf2(pass, salt, 1000000, 128, "sha512", () => {
  console.log("2:", Date.now() - start);
});
crypto.pbkdf2(pass, salt, 1000000, 128, "sha512", () => {
  console.log("3:", Date.now() - start);
});
crypto.pbkdf2(pass, salt, 1000000, 128, "sha512", () => {
  console.log("4:", Date.now() - start);
});
crypto.pbkdf2(pass, salt, 1000000, 128, "sha512", () => {
  console.log("5:", Date.now() - start);
});
crypto.pbkdf2(pass, salt, 1000000, 128, "sha512", () => {
  console.log("6:", Date.now() - start);
});
crypto.pbkdf2(pass, salt, 1000000, 128, "sha512", () => {
  console.log("7:", Date.now() - start);
});
crypto.pbkdf2(pass, salt, 1000000, 128, "sha512", () => {
  console.log("8:", Date.now() - start);
});

// 결과 규칙성 : 1~4와 5~8이 그룹으로 묶이고, 5~8이 시간이 더 소요된다.
// 이유 : 스레드 풀 기본 개수가 4개이기 때문
// UV_THREADPOOL_SIZE=1 node threadpool.js 로 실행하면 다른 결과 나타남
