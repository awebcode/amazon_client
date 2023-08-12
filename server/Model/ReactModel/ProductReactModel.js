import mongoose from"mongoose"



const reactSchema = new mongoose.Schema({
  react: {
    type: String,
    enum: ["like", "love", "haha", "sad", "angry", "wow"],
    required: true,
  },
  postRef: {
    type: mongoose.Schema.ObjectId,
    ref: "product",
  },
  reactBy: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
  },
});

const postReactModel= mongoose.model("React", reactSchema);
export default postReactModel