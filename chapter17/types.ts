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
const c: Type = { hello: "type" };
const c2: Type = {
  hello: "type2",
  func: () => {
    console.log("hello");
  },
};
const c3: Type = {
  hello: "type3",
  func: (param) => {
    if (param) {
      console.log("true");
    } else {
      console.log("false");
    }
  },
};

interface Merge {
  x: number;
}

interface Merge {
  y: number;
}

const m: Merge = { x: 1, y: 2 };

export { a };
