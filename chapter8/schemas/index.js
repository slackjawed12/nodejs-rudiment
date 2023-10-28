import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const connect = await mongoose
  .connect(`mongodb://root:${process.env.DB_PASSWORD}@localhost:27017/admin`, {
    dbName: "nodejs",
    useNewUrlParser: true,
  })
  .then((obj) => {
    console.log("몽고디비 연결 성공");
  })
  .catch((error) => {
    console.log(error);
    console.log("몽고디비 연결 실패");
  });

export default connect;
