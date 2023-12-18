const db = require("../models/index");
const { Post, Hashtag } = db;
export const afterUploadImage = (req, res) => {
  console.log(req.file);
  // res.json({ url: `/img/${req.file.filename}` });
  const originalUrl = req.file.location;
  const url = originalUrl.replace(/\/original\//, "/thumb/");
  res.json({ url, originalUrl });
};

export const uploadPost = async (req, res, next) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      img: req.body.url,
      UserId: req.user.id,
    });

    const hashtags = req.body.content.match(/#[^\s#]*/g);
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
