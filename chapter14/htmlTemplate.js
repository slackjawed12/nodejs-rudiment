#!/usr/bin/env node
const readline = require("readline");
const fs = require("fs");
const path = require("path");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const [fileExt, fileName, path] = process.argv.slice(2);
console.log(fileExt, fileName, path);
const htmlTemplate = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Template</title>
  </head>
  <body>
    <h1>hello</h1>
  </body>
</html>
`;
