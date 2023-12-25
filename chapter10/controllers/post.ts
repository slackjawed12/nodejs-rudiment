import { RequestHandler } from "express";
import Post from "../models/post";
import Hashtag from "../models/hashtag";

export const afterUploadImage: RequestHandler = (req, res) => {
  console.log(req.file);
  // res.json({ url: `/img/${req.file.filename}` });
  // const originalUrl = req.file.location;
  // const url = originalUrl.replace(/\/original\//, "/thumb/");
  const filePath = req.file?.path.split("/").splice(0, 3).join("/");
  const originalUrl = `${filePath}/${req.file?.filename}`;
  const url = originalUrl.replace(/\/original\//, "/thumb/");

  res.json({ url, originalUrl });
};

export const uploadPost: RequestHandler = async (req, res, next) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      img: req.body.url,
      UserId: req.user?.id,
    });

    const hashtags: string[] = req.body.content.match(/#[^\s#]*/g);
    if (hashtags) {
      const result = await Promise.all(
        hashtags.map((tag) => {
          return Hashtag.findOrCreate({
            where: {
              title: tag.slice(1).toLowerCase(),
            },
          });
        })
      );
      console.log(result);
      await post.addHashtags(result.map((r) => r[0]));
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};
