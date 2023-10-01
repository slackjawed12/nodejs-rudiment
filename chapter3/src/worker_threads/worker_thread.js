const { Worker, isMainThread, parentPort } = require("worker_threads");

if (isMainThread) {
  // 메인스레드인 경우
  const worker = new Worker(__filename); // 현재 파일을 워커스레드에서 실행시킨다.
  worker.on("message", (message) => console.log("from worker", message)); // 부모 스레드가 메시지를 받을 때 처리
  worker.on("exit", () => console.log("worker exit")); // 워커가 종료될 때 처리
  worker.postMessage("ping"); // 워커에 데이터를 보냄
} else {
  // 워커스레드인 경우
  parentPort.on("message", (value) => {
    console.log("from parent", value);
    parentPort.postMessage("pong");
    parentPort.close(); // 부모와의 연결 종료
  });
}
