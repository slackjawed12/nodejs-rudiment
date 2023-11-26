const WebSocket = require("ws");

module.exports = (server) => {
  // 인자로 들어온 server 객체(express 서버)를 웹소켓 서버와 연결한다.
  const wss = new WebSocket.Server({ server });
  wss.on("connection", (ws, req) => {
    // 웹 소켓 연결 시 - 클라이언트 ip 확인
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    console.log("새로운 클라이언트 접속", ip);
    ws.on("message", (message) => {
      // 클라이언트로부터 메시지 수신 시
      console.log(message.toString());
    });
    ws.on("error", (error) => {
      // 에러 시
      console.error(error);
    });
    ws.on("close", () => {
      // 연결 종료 시
      console.log("클라이언트 접속 해제", ip);
      clearInterval(ws.interval);
    });

    // 3초마다 클라이언트로 메시지 전송
    ws.interval = setInterval(() => {
      if (ws.readyState === ws.OPEN) {
        ws.send("서버에서 클라이언트로 메시지를 보냅니다.");
      }
    }, 3000);
  });
};
