const path = require("path");

const string = __filename;

console.log("path.sep : ", path.sep); // 경로 구분자
console.log("path.delimiter : ", path.delimiter); // 환경 변수 구분자
console.log("----------------------------------");
console.log("path.dirname() : ", path.dirname(string));
console.log("path.extname() : ", path.extname(string)); // 파일 확장자
// basename
console.log("path.basename() : ", path.basename(string)); // 확장자 포함한 파일 이름
console.log(
  "path.basename - extname : ",
  path.basename(string, path.extname(string)) // 두번째 인수로 확장자 넣으면 파일 이름만 표시
);

console.log("----------------------------------");
console.log("path.parse() : ", path.parse(string)); // root, dir, base, ext로 경로 파싱
console.log(
  "path.format() : ",
  path.format({
    dir: "/users/slackjawed12",
    name: "path",
    ext: ".js",
  })
);
console.log(
  "path.normalize() : ",
  path.normalize("//users\\slackjawed12\\path.js")
);
console.log("----------------------------------");
console.log("path.isAbsolute(/Users) : ", path.isAbsolute("/Users"));
console.log("path.isAbsolute(./home) : ", path.isAbsolute("./home"));
console.log("----------------------------------");
console.log(
  "path.relative() : ",
  path.relative("/users/slackjawed12/path.js", "/users/packages")
); // 첫 번째 경로에서 두 번째 경로로 가는 방법

console.log(
  "path.join() : ",
  path.join(__dirname, "..", "..", "/users", ".", "/slackjawed12")
); // join : '/'를 만나면 상대경로로 처리한다.
console.log(
  "path.resolve() : ",
  path.resolve(__dirname, "..", "users", ".", "/slackjawed12")
); // resolve : '/'를 만나면 절대경로로 처리해서 앞의 경로를 무시한다

console.log("path.posix.sep : ", path.posix.sep);
console.log("path.posix.join : ", path.posix.join(__dirname, "/test"));
console.log("path.win32.sep : ", path.win32.sep);
console.log("path.win32.join : ", path.win32.join(__dirname, "/test"));
