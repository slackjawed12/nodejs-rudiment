const string = "abc";
const number = 1;
const boolean = true;
const obj = {
  outside: {
    inside: {
      key: "value",
    },
  },
};

console.time("전체 시간");
console.log("콘솔 로그. 매일매일 쓰는 것");
console.log(string, number, boolean);
console.error("console.error는 에러 메시지를 출력한다.");
console.table([
  { name: "제로", birth: 1994 },
  { name: "hero", birth: 1998 },
]);

console.dir(obj, { colors: true, depth: 2 });
console.dir(obj, { colors: true, depth: 1 });

console.time("시간 측정");

for (let i = 0; i < 100000; i++) {}
console.timeEnd("시간 측정");

function b() {
  console.trace("에러 위치 추적");
}

function a() {
  b();
}

a();

console.timeEnd("전체 시간");
