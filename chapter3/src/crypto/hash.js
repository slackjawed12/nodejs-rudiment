const crypto = require("crypto");

// createHash : 사용할 해시 알고리즘 - md5, sha1, sha256, sha512
// update : 변환 대상 문자열
// digest : 해시에 의해 암호화된 데이터. 파라미터는 인코딩 알고리즘 - base64, hex 등
console.log(
  "base64:",
  crypto.createHash("sha512").update("안녕하세요").digest("base64")
);
console.log(
  "hex:",
  crypto.createHash("sha512").update("안녕하세요").digest("hex")
);
console.log(
  "base64:",
  crypto.createHash("sha512").update("다른 문자열").digest("base64")
);
