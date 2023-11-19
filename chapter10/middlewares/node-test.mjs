import test from "node:test";
import assert from "node:assert";

test("1+1은 2입니다.", () => {
  assert.strictEqual(1 + 1, 2);
});
