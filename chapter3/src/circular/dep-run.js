const dep1 = require("./dep1");
const dep2 = require("./dep2");

dep1();
// 순환참조의 대상은 empty 객체가 된다.
dep2();
