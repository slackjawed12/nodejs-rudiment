const path = require("path");

const string = __filename;

console.log("path.sep : ", path.sep);
console.log("path.delimiter : ", path.delimiter);
console.log("----------------------------------");
console.log("path.dirname() : ", path.dirname(string));
console.log("path.extname() : ", path.extname(string));
console.log("path.basename() : ", path.basename(string));
console.log(
  "path.basename - extname : ",
  path.basename(string, path.extname(string))
);
console.log("----------------------------------");
console.log("path.parse() : ", path.parse(string));
console.log(
  "path.format() : ",
  path.format({
    dir: "C:\\users\\slackjawed12",
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
