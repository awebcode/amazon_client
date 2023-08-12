import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "user" },
    blog_id: mongoose.Types.ObjectId,
    blog_user_id: mongoose.Types.ObjectId,
    content: { type: String, required: true },
    // image: [{
    //   url: { type: String, required: false }
    // }],
    image: {
      type: String,
    },

    replyCM: [{ type: mongoose.Types.ObjectId, ref: "comment" }],
    reply_user: { type: mongoose.Types.ObjectId, ref: "user" },
    comment_root: { type: mongoose.Types.ObjectId, ref: "comment" },
  },
  {
    timestamps: true,
  }
);

const commentModel = mongoose.model("comment", commentSchema);
export default commentModel;
