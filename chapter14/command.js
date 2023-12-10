#!/usr/bin/env node
const { program } = require("commander");

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
    console.log(type, options.filename, options.directory);
  });

program.command("*", { hidden: true }).action(() => {
  console.log("해당 명령어를 찾을 수 없습니다.");
  program.help();
});

program.parse(process.argv);
