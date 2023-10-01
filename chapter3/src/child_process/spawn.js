const spawn = require("child_process").spawn;

// 첫 번째 인수 : 명령어, 두 번째 인수 : 옵션 배열
const process = spawn("python3", ["test.py"]);
const processV2 = spawn("python3", ["test.py"], { shell: true });
process.stdout.on("data", function (data) {
  console.log(data.toString());
});

process.stderr.on("data", function (data) {
  console.error(data.toString());
});

processV2.stdout.on("data", function (data) {
  console.log(data.toString());
});
