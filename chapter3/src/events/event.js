const EventEmitter = require("events");

const myEvent = new EventEmitter();
myEvent.addListener("event1", () => {
  console.log("이벤트 1");
});
myEvent.on("event2", () => {
  console.log("이벤트 2");
});
myEvent.on("event2", () => {
  console.log("이벤트 2 두 번째 추가");
});
myEvent.on("event2", () => {
  console.log("이벤트 2 세 번째 추가");
});
// 한 번만 실행됨
myEvent.once("event3", () => {
  console.log("이벤트 3");
});

myEvent.emit("event1");
myEvent.emit("event2");

myEvent.emit("event3");
myEvent.emit("event3");

myEvent.on("event4", () => {
  console.log("이벤트 4");
});
myEvent.removeAllListeners("event4");
myEvent.emit("event4");

const listener = () => {
  console.log("이벤트 5");
};
myEvent.on("event5", listener);
// myEvent.removeListener("event5", listener);
myEvent.off("event5", listener); // off : removeListener와 동일한 기능
myEvent.emit("event5");

// listenerCount : 이벤트에 연결된 리스너의 개수를 반환한다.
console.log(myEvent.listenerCount("event2"));
