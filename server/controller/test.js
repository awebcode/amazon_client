import Comments from "../Model/commentModel.js";

import mongoose from "mongoose";
import cloudinary from "cloudinary";

const Pagination = (req) => {
  let page = Number(req.query.page) * 1 || 1;
  let limit = Number(req.query.limit) * 1 || 4;
  let skip = (page - 1) * limit;

  return { page, limit, skip };
};

const commentCtrl = {
  createComment: async (req, res) => {
    if (!req.user) return res.status(400).json({ msg: "invalid Authentication." });

    try {
      // for multiple upload and push array
      //  if (req.body.image) {
      //    const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
      //      folder: "comment_images",
      //    });
      //    imagesLinks.push({
      //      url: myCloud.secure_url,
      //    });
      //  }

      //// for single upload and set string
      let { content, blog_id, blog_user_id, image } = req.body;

      if (image) {
        const myCloud = await cloudinary.v2.uploader.upload(image, {
          folder: "comment_images",
        });
        image = myCloud.secure_url;
      }

      const newComment = new Comments({
        user: req.user._id,
        image, // for single upload and set string
        // image:imagesLinks, // for multiple upload and push array
        content,
        blog_id,
        blog_user_id,
      });

      const data = {
        ...newComment,
        user: req.user,

        createdAt: new Date().toISOString(),
      };

      //   await NotificationModel.create({
      //     subject: `${req.user.name} comment on your product`,
      //     user: req.user,
      //     // content:content
      //     prid: blog_id,
      //   });

      await newComment.save();

      return res.json(newComment);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: err.message });
    }
  },
  getComments: async (req, res) => {
    const { limit, skip } = Pagination(req);

    try {
      const data = await Comments.aggregate([
        {
          $facet: {
            totalData: [
              {
                $match: {
                  blog_id: mongoose.Types.ObjectId(req.params.id),
                  comment_root: { $exists: false },
                  reply_user: { $exists: false },
                },
              },
              {
                $lookup: {
                  from: "users",
                  let: { user_id: "$user" },
                  pipeline: [
                    { $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },
                    { $project: { name: 1, avatar: 1 } },
                  ],
                  as: "user",
                },
              },
              { $unwind: "$user" },
              {
                $lookup: {
                  from: "comments",
                  let: { cm_id: "$replyCM" },
                  pipeline: [
                    { $match: { $expr: { $in: ["$_id", "$$cm_id"] } } },
                    {
                      $lookup: {
                        from: "users",
                        let: { user_id: "$user" },
                        pipeline: [
                          { $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },
                          { $project: { name: 1, avatar: 1 } },
                        ],
                        as: "user",
                      },
                    },
                    { $unwind: "$user" },
                    {
                      $lookup: {
                        from: "users",
                        let: { user_id: "$reply_user" },
                        pipeline: [
                          { $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },
                          { $project: { name: 1, avatar: 1 } },
                        ],
                        as: "reply_user",
                      },
                    },
                    { $unwind: "$reply_user" },
                  ],
                  as: "replyCM",
                },
              },
              { $sort: { createdAt: -1 } },
              { $skip: skip },
              { $limit: limit },
            ],
            totalCount: [
              {
                $match: {
                  blog_id: mongoose.Types.ObjectId(req.params.id),
                  comment_root: { $exists: false },
                  reply_user: { $exists: false },
                },
              },
              { $count: "count" },
            ],
          },
        },
        {
          $project: {
            count: { $arrayElemAt: ["$totalCount.count", 0] },
            totalData: 1,
          },
        },
      ]);

      const comments = data[0].totalData;
      const count = data[0].count;

      let total = 0;

      if (count % limit === 0) {
        total = count / limit;
      } else {
        total = Math.floor(count / limit) + 1;
      }

      return res.json({ comments, total });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  replyComment: async (req, res) => {
    if (!req.user) return res.status(400).json({ msg: "invalid Authentication." });

    try {
      let { content, blog_id, blog_user_id, comment_root, reply_user, image } = req.body;
      if (image) {
        const myCloud = await cloudinary.v2.uploader.upload(image, {
          folder: "comment_images",
        });
        image = myCloud.secure_url;
      }

      const newComment = new Comments({
        user: req.user._id,
        image,
        content,
        blog_id,
        blog_user_id,
        comment_root,
        reply_user: reply_user?._id,
      });

      await Comments.findOneAndUpdate(
        { _id: comment_root },
        {
          $push: { replyCM: newComment._id },
        }
      );

      const data = {
        ...newComment,
        user: req.user,
        reply_user: reply_user?._id,
        createdAt: new Date().toISOString(),
      };
      //   await NotificationModel.create({
      //     subject: `${req.user.name} reply comment on your product`,
      //     user: req.user,
      //     prid: blog_id,
      //   });

      await newComment.save();

      return res.json(newComment);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: err.message });
    }
  },
  updateComment: async (req, res) => {
    if (!req.user) return res.status(400).json({ msg: "invalid Authentication." });

    try {
      const { data } = req.body;

      const comment = await Comments.findOneAndUpdate(
        {
          _id: req.params.id,
          user: req.user.id,
        },
        { content: data.content }
      );

      if (!comment) return res.status(400).json({ msg: "Comment does not exits." });

      return res.json({ msg: "Update Success!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteComment: async (req, res) => {
    if (!req.user) return res.status(400).json({ msg: "invalid Authentication." });

    try {
      const comment = await Comments.findOneAndDelete({
        _id: req.params.id,
        $or: [{ user: req.user._id }, { blog_user_id: req.user._id }],
      });

      if (!comment) return res.status(400).json({ msg: "Comment does not exits." });

      if (comment.comment_root) {
        // update replyCM
        await Comments.findOneAndUpdate(
          { _id: comment.comment_root },
          {
            $pull: { replyCM: comment._id },
          }
        );
      } else {
        // delete all comments in replyCM
        await Comments.deleteMany({ _id: { $in: comment.replyCM } });
      }

      return res.json({ msg: "Delete Success!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default commentCtrl;
