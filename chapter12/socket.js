// const WebSocket = require("ws");
const SocketIO = require("socket.io");

module.exports = (server) => {
  // 인자로 들어온 server 객체(express 서버)를 웹소켓 서버와 연결한다.
  const io = SocketIO(server, { path: "/socket.io" });

  io.on("connection", (socket) => {
    // 웹 소켓 연결 시 - 클라이언트 ip 확인
    const req = socket.request;
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    console.log("새로운 클라이언트 접속", ip, socket.id, req.ip);
    socket.on("disconnect", () => {
      // 연결 종료 시
      console.log("클라이언트 접속 해제", ip);
      clearInterval(ws.interval);
    });
    /** reply : 사용자가 직접 설정한 이벤트 이름 - ws 모듈과 차이점 */
    socket.on("reply", (data) => {
      // 클라이언트로부터 메시지 수신 시
      console.log(data);
    });
    socket.on("error", (error) => {
      // 에러 시
      console.error(error);
    });
    // 3초마다 클라이언트로 메시지 전송
    socket.interval = setInterval(() => {
      socket.emit("news", "Hello Socket.IO");
    }, 3000);
  });
};
