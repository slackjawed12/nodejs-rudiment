// worker_threads와 차이 : 스레드 vs 프로세스
const cluster = require("cluster");
const http = require("http");
const numCPUs = require("os").cpus().length;

if (cluster.isMaster) {
  console.log(`마스터 프로세스 아이디: ${process.pid}`);
  // CPU 개수만큼 워커 프로세스 생성
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // 워커 종료 시
  cluster.on("exit", (worker, code, signal) => {
    console.log(`${worker.process.pid}번 워커가 종료되었습니다.`);
    console.log(`code`, code, `signal`, signal);
    // 워커 프로세스가 종료될 때 다시 생성하기
    cluster.fork();
  });
} else {
  // 워커 프로세스인 경우 8080 포트에서 요청 대기
  http
    .createServer((req, res) => {
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.write("<h1>Hello Node</h1>");
      res.end("<p>Hello Cluster!</p>");
      // 요청이 들어오면 1초 뒤에 워커 프로세스 종료
      // cpu 개수만큼 요청을 보내면, 모든 워커 프로세스가 종료되고 마스터 프로세스도 종료된다.
      setTimeout(() => {
        process.exit();
      }, 1000);
    })
    .listen(8080);

  console.log(`${process.pid}번 워커 실행`);
}
// 클러스터링 장점 : 예상하지 못한 에러로 한 번에 서버가 종료되는 것을 방지할 수 있음
// pm2 모듈을 통해 cluster 기능 사용할 수 있음
