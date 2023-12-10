#!/usr/bin/env node
const { program } = require("commander");
const fs = require("fs");
const path = require("path");

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

const makeTemplate = (type, name, directory) => {
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

// 기본 명령어 이름은 와일드카드 * 에 속하지 않는다.
program.version("0.0.1", "-v, --version").name("cli");

// -h --help 사용 했을 때 설명서에 표시할 내용
program
  .command("template <type>")
  .usage("<type> --filename [filename] --path [path]")
  .description("템플릿을 생성합니다.")
  .alias("tmpl")
  .option("-f, --filename [filename]", "파일명을 생성하세요", "index")
  .option("-d, --directory [path]", "생성 경로를 입력하세요.", ".")
  // action : 명령어 실제 동작 정의
  .action((type, options, command) => {
    makeTemplate(type, options.filename, options.directory);
  });

program.command("*", { hidden: true }).action(() => {
  console.log("해당 명령어를 찾을 수 없습니다.");
  program.help();
});

program.parse(process.argv);
