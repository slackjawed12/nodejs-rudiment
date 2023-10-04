const http = require("http");

http
  .createServer((req, res) => {
    console.log(req.url, req.headers.cookie);
    res.writeHead(200, { "set-cookie": "mycookie=test" });
    res.end("hello cookie");
  })
  .listen(8080, () => {
    console.log("8080번 포트에서 서버 대기 중");
  });
