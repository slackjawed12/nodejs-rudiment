const url = require("url");

const { URL } = url;

const myURL = new URL(
  "http://www.gilbut.co.kr/book/bookList.aspx?sercate1=001001000#anchor"
);

console.log("new URL : ", myURL);
console.log("url.format():", url.format(myURL)); // url 객체를 url 문자열로 반환한다.
