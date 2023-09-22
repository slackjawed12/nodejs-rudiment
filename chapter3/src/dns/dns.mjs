import dns from "dns/promises";
// DNS 모듈 : 도메인을 통해 IP, DNS 정보를 얻을 때 사용할 수 있다.
const ip = await dns.lookup("gilbut.co.kr");
console.log("ip : ", ip);

// dns.resolve : 도메인의 특정 레코드에 대한 정보를 조회한다.
const A = await dns.resolve("gilbut.co.kr", "A");
console.log("A : ", A);

const MX = await dns.resolve("gilbut.co.kr", "MX");
console.log("MX : ", MX);

const CNAME = await dns.resolve("www.gilbut.co.kr", "CNAME");
console.log("CNAME : ", CNAME);

const ANY = await dns.resolve("gilbut.co.kr", "ANY");
console.log("ANY : ", ANY);
