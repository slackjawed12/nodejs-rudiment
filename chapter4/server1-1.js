const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.write("<h1>Hello Node!</h1>");
  res.end("<p>Hello Server 1-1!</p>");
});

server.listen(8080);

// 서버에 listening 이벤트 리스너를 붙이는 방식으로도 요청을 받을 수 있다.
server.on("listening", () => {
  console.log("8080번 포트에서 대기 중");
});

server.on("error", (error) => {
  console.error(error);
});
