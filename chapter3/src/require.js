console.log("require");

module.exports = "middle module export";

require("./var");

console.log("******** require.cache ********");
// require.cache는 먼저 require된 패키지 경로가 키값으로 들어가 있는 객체이다.
// 최초 생성시에만 할당되고, 이후에는 키를 참조한다.
console.log("require.cache : ", require.cache);
console.log("******** require.main ********");
console.log("require.main : ", require.main);

console.log(require.main === module);
console.log("require.main.filename : ", require.main.filename);
