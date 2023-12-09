#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const type = process.argv[2];
const name = process.argv[3];
const directory = process.argv[4] || ".";

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
    res.send("ok");
  } catch (error) {
    console.error(error);
    next(error);
  }
})

module.exports = router;
`;

const isDirectoryExist = (dir) => {
  try {
    fs.accessSync(
      dir,
      fs.constants.F_OK | (fs.constants.R_OK + fs.constants.W_OK)
    );
    return true;
  } catch (erro) {
    return false;
  }
};

const mkdirp = (dir) => {
  const dirname = path
    .relative(".", path.normalize(dir))
    .split(path.sep)
    .filter((p) => !!p);

  dirname.forEach((d, idx) => {
    const pathBuilder = dirname.slice(0, idx + 1).join(path.sep);
    if (!isDirectoryExist(pathBuilder)) {
      fs.mkdirSync(pathBuilder);
    }
  });
};

const makeTemplate = () => {
  mkdirp(directory);
  if (type === "html") {
    const pathToFile = path.join(directory, `${name}.html`);
    if (isDirectoryExist(pathToFile)) {
      console.error("이미 해당 파일이 존재합니다.");
    } else {
      fs.writeFileSync(pathToFile, htmlTemplate);
      console.log(pathToFile, "생성 완료");
    }
  } else if (type === "express-router") {
    const pathToFile = path.join(directory, `${name}.js`);
    if (isDirectoryExist(pathToFile)) {
      console.error("이미 해당 파일이 존재합니다.");
    } else {
      fs.writeFileSync(pathToFile, routerTemplate);
      console.log(pathToFile, "생성 완료");
    }
  } else {
    console.error("html 또는 express-router 둘 중 하나를 입력하세요");
  }
};

const program = () => {
  if (!type || !name) {
    console.error("사용 방법: cli html|express-router 파일명 [생성 경로]");
  } else {
    makeTemplate();
  }
};

program();
