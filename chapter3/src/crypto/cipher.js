const crypto = require("crypto");
// 양방향 암호화, 대칭형 암호화
const algorithm = "aes-256-cbc"; // 암호화 알고리즘
const key = "abcdefghijklmnopqrstuvwxyz123456"; // 키 : 32바이트(256bit) 문자열 (aes-256-cbc)
const iv = "1234567890123456"; // iv : 초기화 벡터 - 16바이트 문자열

const cipher = crypto.createCipheriv(algorithm, key, iv);
console.log(crypto.getCiphers()); // 사용 가능한 알고리즘 목록
let result = cipher.update("암호화대상", "uft8", "base64");
result += cipher.final("base64");
console.log("암호화 : ", result);

const decipher = crypto.createDecipheriv(algorithm, key, iv);
let result2 = decipher.update(result, "base64", "utf8");
result2 += decipher.final("utf8");
console.log("복호화 : ", result2);
