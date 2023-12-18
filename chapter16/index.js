const sharp = require("sharp");
const { S3Client } = require("@aws-sdk/client-s3");

const s3 = new S3Client();

exports.handler = async (event, context, callback) => {
  console.log(event);
  console.log(context);
  const Bucket = event.Records[0].s3.bucket.name;
  const Key = decodeURIComponent(event.Records[0].s3.object.key);
  const filename = Key.split("/").at(-1);
  const ext = Key.split(".").at(-1).toLocaleLowerCase();
  // sharp setting
  const requiredFormat = ext === "jpg" ? "jpeg" : ext;
  console.log("name", filename, "ext", ext);

  try {
    const s3Object = await s3.getObject({ Bucket, Key });
    console.log("original", s3Object.Body.length);
    const resizedImage = await sharp(s3Object.Body)
      .resize(200, 200, {
        fit: "inside",
      })
      .toFormat(requiredFormat)
      .toBuffer();
    await s3.putObject({
      Bucket,
      Key: `thumb/${filename}`,
      Body: resizedImage,
    });
    console.log("put", resizedImage.length);
    return callback(null, `thumb/${filename}`);
  } catch (error) {
    console.error(error);
    return callback(error);
  }
};
