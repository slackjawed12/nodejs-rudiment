const { createLogger, format, transports } = require("winston");

const logger = createLogger({
  level: "info",
  format: format.json(),
  transports: [
    new transports.File({ filename: "combined.log" }),
    new transports.File({ filename: "error.log", level: "error" }),
  ],
});

// 배포환경이 아니면 파일 뿐만아니라 콘솔에도 출력하도록 설정
if (process.env.NODE_ENV !== "production") {
  logger.add(new transports.Console({ format: format.simple() }));
}

// winston-daily-rotate-file : 로그 날짜별 관리 패키지
module.exports = logger;
