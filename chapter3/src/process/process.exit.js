// process.exit() : 실행중인 노드 프로세스를 종료한다.
let i = 1;
setInterval(() => {
  if (i === 5) {
    console.log("종료조건에 도달했습니다.");
    process.exit(0); // 정상 종료
    // process.exit(1); // 비정상 종료
  }
  console.log(i);
  i += 1;
}, 1000);
