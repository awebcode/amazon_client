import mongoose from "mongoose";

const tagSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add your tag"],
      trim: true,
      unique: true,
      maxLength: [50, "Name is up to 50 chars long."],
    },
  },
  {
    timestamps: true,
  }
);

const Tag = mongoose.model("tag", tagSchema);
export default Tag;
