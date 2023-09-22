// URL은 노드 내장 객체이므로 require 없이 사용할 수 있다.
const myURL = new URL(
  "http://www.gilbut.co.kr/?page=3&limit=10&category=node.js&category=javascript"
);

// URLSearchParams도 노드 내장 객체이다. : for ... of 로 순회 가능. Map 객체 인터페이스를 따른다 (key 중복 가능함)
console.log("searchParams : ", myURL.searchParams);

console.log("searchParams.getAll() : ", myURL.searchParams.getAll("category")); // getAll : 키에 해당하는 모든 값을 가져옴
console.log("searchParams.get() : ", myURL.searchParams.get("limit")); // get : 해당 키의 첫 번째 값만 가져옴
console.log("searchParams.has() : ", myURL.searchParams.has("page")); // has : 키가 있는지 없는지 검사

console.log("searchParams.keys() : ", myURL.searchParams.keys()); // iterator 객체로 키를 가져옴
console.log("searchParams.values() : ", myURL.searchParams.values()); // iterator 객체로 밸류들을 가져옴

myURL.searchParams.append("filter", "es3"); // append : 같은 키 값이 있으면 유지하고 없으면 추가한다.
myURL.searchParams.append("filter", "es5");
console.log(myURL.searchParams.getAll("filter"));

myURL.searchParams.set("filter", "es6"); // set : 같은 키 값을 모두 지우고 새로 대체함
console.log(myURL.searchParams.getAll("filter"));

myURL.searchParams.delete("filter"); // 해당 키(filter)를 제거함
console.log(myURL.searchParams.getAll("filter"));

console.log("searchParams.toString() : ", myURL.searchParams.toString());
myURL.search = myURL.searchParams.toString();
