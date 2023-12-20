const { Storage } = require("@google-cloud/storage");
const sharp = require("sharp");

exports.resizeAndUpload = (data, context) => {
  console.log(data, context);
  const storage = new Storage();
  const { bucket, name } = data;

  if (!name.startsWith("original")) {
    return 1;
  }

  const filename = name.split("/").at(-1);
  const ext = filename.split(".").at(-1).toLowerCase();
  const requiredFormat = ext === "jpg" ? "jpeg" : ext;
  console.log("name", name, "ext", ext);

  // google cloud storage는 file 메서드 반환값이 File 객체임
  const file = storage.bucket(bucket).file(name);
  // 기존 파일로부터 read stream 생성
  const readStream = file.createReadStream();

  const newFile = storage.bucket(bucket).file(`thumb/${filename}`);
  const writeStream = newFile.createWriteStream();

  readStream
    .pipe(sharp().resize(200, 200, { fit: "inside" }).toFormat(requiredFormat))
    .pipe(writeStream);

  return new Promise((resolve, reject) => {
    writeStream.on("finish", () => {
      resolve(`thumb/${filename}`);
    });
    writeStream.on("error", reject);
  });
};
