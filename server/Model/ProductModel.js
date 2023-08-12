import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
      required: true,
    },

    numOfRatings: {
      type: String,
      default: 0,
    },
    ratings: {
      type: String,
      default: 0,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
      required: true,
    },
    comments: {
      type: Number,
      default: 0,
    },
   
    images: {
      type: Array,
      required: true,
    },
  },

  { timestamps: true }
);
export const Product = mongoose.model("product", productSchema);
//export default Product;
