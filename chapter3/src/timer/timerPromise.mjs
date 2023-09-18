import { setTimeout, setInterval } from "timers/promises";

await setTimeout(3000);
console.log("3초 뒤 실행됩니다.");

for await (let startTime of setInterval(1000, Date.now())) {
  console.log("1초마다 실행", new Date(startTime));
}
