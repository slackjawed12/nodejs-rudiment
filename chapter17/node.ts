import fs from "fs";
fs.readFile("package.json", (err, result) => {
  console.log(result);
});
