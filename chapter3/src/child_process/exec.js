const exec = require("child_process").exec;

// 현재(쉘 기준) 폴더의 파일 목록들이 표시됨
// exec : 쉘을 실행해서 명령어를 수행함
const process = exec("ls");

// data 이벤트리스너에 버퍼 형태로 결과가 전달된다.
process.stdout.on("data", function (data) {
  console.log(data.toString());
});

process.stderr.on("data", function (data) {
  console.error(data.toString());
});
