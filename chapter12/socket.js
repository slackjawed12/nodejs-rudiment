// const WebSocket = require("ws");
const SocketIO = require("socket.io");
const { removeRoom } = require("./services");
const cookieParser = require("cookie-parser");
// const { Server } = require("socket.io");

module.exports = (server, app, sessionMiddleware) => {
  // 인자로 들어온 server 객체(express 서버)를 웹소켓 서버와 연결한다.
  const io = SocketIO(server, { path: "/socket.io" });
  // const io = new Server(server, { path: "/socket.io" });
  // socket io 객체 저장
  app.set("io", io);
  const room = io.of("/room");
  const chat = io.of("/chat");
  // wrapper - 파라미터로 전달한 미들웨어의 req, res, next 제공
  // socket.io의 미들웨어는 socket, next로 볼 수 있음
  const wrap = (middleware) => (socket, next) =>
    middleware(socket.request, {}, next);
  // chat.use 메서드에 미들웨어 추가 - chat 네임스페이스에 웹소켓 연결될때마다 실행
  chat.use(wrap(cookieParser(process.env.COOKIE_SECRET)));
  chat.use(wrap(sessionMiddleware));

  room.on("connection", (socket) => {
    console.log("room 네임스페이스에 접속");
    socket.on("disconnect", () => {
      console.log("room 네임스페이스 접속 해제");
    });
  });

  chat.on("connection", (socket) => {
    console.log("chat 네임스페이스에 접속");

    console.log("socket.request.session", socket.request.session);
    socket.on("join", (data) => {
      // socket.join : 네임스페이스의 특정 방에 접속
      socket.join(data);
      socket.to(data).emit("join", {
        user: "system",
        chat: `${socket.request.session.color}님이 입장하셨습니다.`,
      });
    });

    socket.on("disconnect", async () => {
      console.log("chat 네임스페이스 접속 해제");
      const { referer } = socket.request.headers; // 브라우저의 주소
      const roomId = new URL(referer).pathname.split("/").at(-1); // 방 아이디 추출

      /** 참여자 수가 0이면 remove 호출 */
      const currentRoom = chat.adapter.rooms.get(roomId);
      const userCount = currentRoom?.size || 0;
      if (userCount === 0) {
        await removeRoom(roomId);
        room.emit("removeRoom", roomId);
        console.log("방 제거 요청 성공");
      } else {
        // 특정 방에 데이터를 보낸다.
        console.log("socket.request.session", socket.request.session);
        socket.to(roomId).emit("exit", {
          user: "system",
          // 미들웨어에 socket io 연결했으므로 세션 사용 가능
          chat: `${socket.request.session.color}님이 퇴장하셨습니다.`,
        });
      }
    });
  });
};
