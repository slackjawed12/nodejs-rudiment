const a = true;
// ESM에서는 import 함수를 사용해서 다이내믹 임포트한다.
if (a) {
  // esm 모듈이므로 최상위 스코프에서 await(top level await) 가능
  const m1 = await import("../esm/func.mjs");
  console.log(m1); // {default: [Function: ...]}
  const m2 = await import("../esm/var.mjs");
  console.log(m2);
  const cjs = await import("../func.js");
  console.log("cjs : ", cjs); // {default: [Function: ...]}
}
