#!/usr/bin/env node
const readline = require("readline");
const fs = require("fs");
const path = require("path");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

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

const routerTemplate = `
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  try {
    res.send(<ok>);
  } catch (error) {
    console.error(error);
    next(error);
  }
})

module.exports = router;
`;

const executeTemplateCommand = () => {
  const [fileExt, fileName, filePath] = process.argv.slice(2);
  checkPathAndCreateDirectory(filePath);
  makeTemplateFile(fileExt, filePath, fileName);
};

const checkPathAndCreateDirectory = (filePath) => {
  try {
    const x = fs.readdirSync(filePath);
  } catch (err) {
    fs.mkdirSync(filePath);
  }
};

const makeTemplateFile = (fileExt, filePath, fileName) => {
  try {
    const readResult = fs.readFileSync(`${filePath}/${fileName}.${fileExt}`);
    if (readResult) {
      throw new Error("해당 경로에 이미 파일이 있습니다.");
    }

    if (fileExt === "html") {
      makeHtmlTemplate(fileExt, filePath, fileName);
      return;
    }
    if (fileExt === "ts" || fileExt === "js") {
      makeRouterTemplate(fileExt, filePath, fileName);
    }
  } catch (err) {
    console.log(err);
  }
};

const makeHtmlTemplate = (fileExt, filePath, fileName) => {
  fs.writeFileSync(`${filePath}/${fileName}.${fileExt}`, htmlTemplate);
};

const makeRouterTemplate = (fileExt, filePath, fileName) => {
  fs.writeFileSync(`${filePath}/${fileName}.${fileExt}`, routerTemplate);
};

executeTemplateCommand();
