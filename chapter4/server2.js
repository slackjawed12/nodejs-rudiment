const http = require("http");
const fs = require("fs").promises;

http
  .createServer(async (req, res) => {
    try {
      // 요청이 들어오면 fs 모듈을 통해 html 파일을 읽는다.
      const data = await fs.readFile("./server2.html");
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      // data 변수에 저장된 버퍼를 클라이언트에게 보낸다.
      res.end(data);
    } catch (err) {
      console.error(err);
      // 에러메시지는 일반 문자열이므로 text/plain을 사용한다.
      res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      res.end(err.message);
    }
  })
  .listen(8080, () => {
    console.log("8080번 포트에서 서버 대기 중");
  });
