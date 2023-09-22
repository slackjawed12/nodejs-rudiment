const url = require("url");

const { URL } = url; // URL은 노드 내장 객체이므로 require 없이 사용할 수 있다.

const myURL = new URL(
  "http://www.gilbut.co.kr/book/bookList.aspx?sercate1=001001000#anchor"
);

console.log("new URL : ", myURL);
console.log("url.format():", url.format(myURL)); // url 객체를 url 문자열로 반환한다.
