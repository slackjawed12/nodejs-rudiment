#!/usr/bin/env node
const { program } = require("commander");
const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const chalk = require("chalk");

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
      console.error(chalk.bold.red("이미 해당 파일이 존재합니다."));
    } else {
      fs.writeFileSync(pathToFile, htmlTemplate);
      console.log(chalk.green(pathToFile, "생성 완료"));
    }
  } else if (type === "express-router") {
    const pathToFile = path.join(directory, `${name}.js`);
    if (isDirectoryExist(pathToFile)) {
      console.error(chalk.bold.red("이미 해당 파일이 존재합니다."));
    } else {
      fs.writeFileSync(pathToFile, routerTemplate);
      console.log(chalk.green(pathToFile, "생성 완료"));
    }
  } else {
    console.error(
      chalk.bold.red("html 또는 express-router 둘 중 하나를 입력하세요")
    );
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

// npx cli 만 입력되었을 때 대화형 cli를 띄운다.
program
  .action((options, command) => {
    // command args는 명령어 뒤에 붙은 추가 명령어가 들어간다.
    // npx cli template 이었다면 위의 command에서 처리됐을 것
    // 그 외의 경우에는 유효하지 않은 입력이므로 예외처리
    if (command.args.length !== 0) {
      console.log(chalk.bold.red("해당 명령어를 찾을 수 없습니다."));
      program.help();
    } else {
      inquirer
        .prompt([
          {
            type: "list",
            name: "type",
            message: "템플릿 종류를 선택하세요",
            choices: ["html", "express-router"],
          },
          {
            type: "input",
            name: "name",
            message: "파일의 이름을 입력하세요",
            default: "index",
          },
          {
            type: "input",
            name: "directory",
            message: "파일이 위치할 폴더의 경로를 입력하세요",
            default: ".",
          },
          {
            type: "confirm",
            name: "confirm",
            message: "생성하시겠습니까?",
          },
        ])
        .then((answer) => {
          // promise에서 받는 answer 객체는 질문의 name속성값을 키로, 사용자 입력을 값으로 갖는다.
          if (answer.confirm) {
            makeTemplate(answer.type, answer.name, answer.directory);
            console.log(chalk.rgb(128, 128, 128)("터미널을 종료합니다."));
          }
        });
    }
  })
  .parse(process.argv);
