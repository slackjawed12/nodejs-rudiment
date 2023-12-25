let a: string | number = "hello";
a = 123;

let arr: string[] = [];
arr.push("hello");

interface Inter {
  hello: string;
  world?: number;
}

const b: Inter = { hello: "interface" };

type Type = {
  hello: string;
  func?: (param?: boolean) => void;
};

interface Merge {
  x: number;
}

interface Merge {
  y: number;
}

const m: Merge = { x: 1, y: 2 };

export { a };
