const os = require("os");
// const os = require('node:os')

console.log("-----운영체제 정보-----");
console.log("os.arch() : ", os.arch()); // process.arch
console.log("os.platform() : ", os.platform()); // process.platform
console.log("os.type() : ", os.type()); // 운영체제 종류
console.log("os.uptime() : ", os.uptime()); // 운영체제의 부팅 이후 흐른 시간
console.log("os.hostname() : ", os.hostname()); // 컴퓨터의 이름
console.log("os.release() : ", os.release()); // 운영체제 버전

console.log();
console.log("-----경로 정보-----");
console.log("os.homedir() : ", os.homedir()); // 홈 디렉터리 경로
console.log("os.tmpdir() : ", os.tmpdir()); // 임시저장 파일 경로

console.log();
console.log("-----cpu 정보-----");
console.log("os.cpus() : ", os.cpus()); // 컴퓨터 코어 정보 - 코어 정보 객체배열
console.log("os.cpus().length : ", os.cpus().length);

console.log();
console.log("-----메모리 정보-----");
console.log("os.freemem() : ", os.freemem()); // 사용 가능 메모리
console.log("os.totalmem() : ", os.totalmem()); // 전체 메모리 용량

console.log();
console.log("-----상수 -----");
console.log(os.constants);
