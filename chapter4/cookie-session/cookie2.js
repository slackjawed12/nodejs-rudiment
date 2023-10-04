const http = require("http");
const fs = require("fs").promises;
const path = require("path");

const parseCookie = (cookie = "") => {
  return cookie
    .split(";")
    .map((v) => v.split("="))
    .reduce((acc, [k, v]) => {
      acc[k.trim()] = decodeURIComponent(v);
      return acc;
    }, {});
};

http
  .createServer(async (req, res) => {
    const cookies = parseCookie(req.headers.cookie);
    console.log(cookies);
    if (req.url.startsWith("/login")) {
      const url = new URL(req.url, "http://localhost:8080");
      const name = url.searchParams.get("name"); // 쿼리스트링 값 가져오기
      const expires = new Date();

      expires.setMinutes(expires.getMinutes() + 5); // 만료시각 5분 더함
      // Expires : 키의 만료 시각, HttpOnly : 자바스크립트에서 쿠키에 접근 불가, Path : 쿠키 전송될 URL
      res.writeHead(302, {
        // redirect
        location: "/",
        "set-cookie": `name=${encodeURIComponent(
          // 한글 못들어가므로 인코딩
          name
        )}; Expires=${expires.toUTCString()}; HttpOnly; Path=/`,
      });
      res.end();
    } else if (cookies.name) {
      // url : /, cookie의 name 키 있는 경우
      res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
      res.end(`${cookies.name}님 안녕하세요`);
    } else {
      // url : /, cookie의 name 키 없는 경우
      try {
        const data = await fs.readFile(path.join(__dirname, "cookie2.html"));
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(data);
      } catch (err) {
        res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
        res.end(err.message);
      }
    }
  })
  .listen(8080, () => {
    console.log("8080번 포트에서 서버 대기 중");
  });
