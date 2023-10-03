const http = require("http");

http
  .createServer((req, res) => {
    // writeHead - header 정보 지정
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    // write - body
    res.write("<h1>Hello Node!</h1>");
    // end - 응답 종료 : 인수 있으면 해당 데이터도 body에 담아서 전송함
    res.end("<p>Hello Server!</p>");
  })
  // listen을 두번 하면 ERR_SERVER_ALREADY_LISTEN 오류 발생
  // .listen(8080, ()=>{
  //   console.log("XXXXXX");
  // })
  .listen(8080, () => {
    console.log("080번 포트에서 서버 대기 중");
  });
