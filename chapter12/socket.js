// const WebSocket = require("ws");
const SocketIO = require("socket.io");

module.exports = (server, app) => {
  // 인자로 들어온 server 객체(express 서버)를 웹소켓 서버와 연결한다.
  const io = SocketIO(server, { path: "/socket.io" });
  app.set("io", io);
  const room = io.of("/room");
  const chat = io.of("/chat");

  room.on("connection", (socket) => {
    console.log("room 네임스페이스에 접속");
    socket.on("disconnect", () => {
      console.log("room 네임스페이스 접속 해제");
    });
  });

  chat.on("connection", (socket) => {
    console.log("chat 네임스페이스에 접속");

    socket.on("join", (data) => {
      socket.join(data);
    });

    socket.on("disconnect", () => {
      console.log("chat 네임스페이스 접속 해제");
    });
  });
};
