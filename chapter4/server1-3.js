// https 모듈 사용법
const https = require("https");
const fs = require("fs");

https
  .createServer(
    {
      // options 인수 : https.ServerOptions 객체 - 발급받은 인증서, 비밀 키 등을 프로퍼티로 전달
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
