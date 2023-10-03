setInterval(() => {
  console.log("시작");
  try {
    throw new Error("서버 에러");
  } catch (err) {
    // 에러가 발생하지만 catch문에서 잡으므로 프로세스가 멈추지 않고 계속 실행된다.
    console.error(err);
  }
}, 1000);
