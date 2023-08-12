import Tag from "../Model/TagModel.js";
import { Product } from "../Model/ProductModel.js";

const tagCtrl = {
  createTag: async (req, res) => {
    if (!req.user) return res.status(400).json({ msg: "Invalid Authentication." });

    // if (req.user.role !== "admin")
    //   return res.status(400).json({ msg: "Invalid Authentication." });

    try {
      const name = req.body.name.toLowerCase();

      const newTag = new Tag({ name });
      await newTag.save();

      res.json({ newTag });
    } catch (err) {
      let errMsg;

      if (err.code === 11000) {
        errMsg = Object.values(err.keyValue)[0] + " already exists.";
      } else {
        let name = Object.keys(err.errors)[0];
        errMsg = err.errors[`${name}`].message;
      }

      return res.status(500).json({ msg: errMsg });
    }
  },
  getTag: async (req, res) => {
    try {
      const tags = await Tag.find().sort("-createdAt");
      res.json({ tags });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateTag: async (req, res) => {
    if (!req.user) return res.status(400).json({ msg: "Invalid Authentication." });

    // if (req.user.role !== "admin")
    //   return res.status(400).json({ msg: "Invalid Authentication." });

    try {
      const tag = await Tag.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        { name: req.body.name.toLowerCase() }
      );

      res.json({ msg: "Update Success!",tag });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteTag: async (req, res) => {
    if (!req.user) return res.status(400).json({ msg: "Invalid Authentication." });

    // if (req.user.role !== "admin")
    //   return res.status(400).json({ msg: "Invalid Authentication." });

    try {
      const product = await Product.findOne({ Tag: req.params.id });
      if (product)
        return res.status(400).json({
          msg: "Can not delete! In this Tag also exist product.",
        });

      const tag = await Tag.findByIdAndDelete(req.params.id);
      if (!tag) return res.status(400).json({ msg: "Tag does not exists." });

      res.json({ msg: "Delete Success!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default tagCtrl;
