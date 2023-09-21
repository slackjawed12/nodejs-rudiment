setImmediate(() => {
  console.log("immediate");
});

Promise.resolve().then(() => console.log("promise one"));
Promise.resolve().then(() => console.log("promise two"));

// process.nextTick : setImmediate, setTimeout, Promise 보다 먼저 실행됨
process.nextTick(() => {
  console.log("nextTick");
});

setTimeout(() => {
  console.log("timeout");
}, 0);

Promise.resolve().then(() => console.log("promise three"));

// nextTick, Promise : 마이크로태스크
