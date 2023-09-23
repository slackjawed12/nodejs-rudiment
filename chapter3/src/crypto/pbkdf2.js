const crypto = require("crypto");

// 랜덤 바이트로 salt를 만들어 암호화 하는 예시 (실제로 salt는 외부로 유출되서는 안되는 키)
// randomBytes: 64바이트 길이 문자열 = salt
crypto.randomBytes(64, (err, buf) => {
  const salt = buf.toString("base64");
  console.log("salt : ", salt);

  // pbkdf2 : password based key derivation function version 2
  // 비밀번호, salt, 반복횟수, 출력바이트, 해시 알고리즘 : sha512로 변환된 값을 다시 변환하는 과정을 10만번 반복
  // password + salt -> hash -> digest
  crypto.pbkdf2("비밀번호", salt, 100000, 64, "sha512", (err, key) => {
    console.log("password:", key.toString("base64"));
  });
  // crypto.randomBytes, crypto.pbkdf2 : 내부적으로 멀티스레딩으로 동작함
});
