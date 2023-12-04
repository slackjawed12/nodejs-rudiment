const SSE = require("sse");

module.exports = (server) => {
  // new SSE 로 서버 객체를 생성하고, connection 이벤트 리스너를 연결한다.
  const sse = new SSE(server);
  // 연결 시 어떤 동작을 할 지 콜백함수로 정의한다.
  sse.on("connection", (client) => {
    setInterval(() => {
      // 1초마다 클라이언트에 서버시간 타임스탬프를 보낸다.
      client.send(Date.now().toString());
    }, 1000);
  });
};
