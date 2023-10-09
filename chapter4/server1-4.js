// http/2 모듈 - SSL 암호화 + http/2 프로토콜 사용
const http2 = require("http2");
const fs = require("fs");

http2
  .createSecureServer(
    {
      cert: fs.readFileSync("domain certification path"),
      key: fs.readFileSync("domain secret key path"),
      ca: [
        fs.readFileSync("상위 인증서 경로"),
        fs.readFileSync("상위 인증서 경로2"),
      ],
    },
    (req, res) => {
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.write("<h1>Hello Node!</h1>");
      res.end("<p>Hello Server!</p>");
    }
  )
  .listen(443, () => {
    console.log("443번 포트에서 서버 대기 중");
  });
