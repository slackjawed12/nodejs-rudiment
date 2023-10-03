process.on("uncaughtException", (err) => {
  console.error("예기치 못한 에러", err);
});

// uncaughtException이 없으면 catch되지 않은 error 이므로 프로세스가 멈춘다.
setInterval(() => {
  throw new Error("서버 에러");
}, 1000);

setTimeout(() => {
  console.log("실행");
}, 2000);
