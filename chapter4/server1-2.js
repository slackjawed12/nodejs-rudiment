const http = require("http");
// 한 프로세스에서 서버를 여러 개 실행할 수 있다.
http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write("<h1>Hello Node!</h1>");
    res.end("<p>Hello Server 1-2!</p>");
  })
  .listen(8080, () => {
    console.log("8080번 포트에서 서버 대기 중");
  });

http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write("<h1>Hello Node!</h1>");
    res.end("<p>Hello Server!</p>");
  })
  .listen(8081, () => {
    console.log("8081번 포트에서 서버 대기 중");
  });
