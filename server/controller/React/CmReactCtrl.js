import  mongoose  from"mongoose"
import CmReactModel from "../../Model/ReactModel/CmReactModel.js";

import userModel from"../../Model/UserModel.js"

export const reactPostComment = async (req, res) => {
  try {
    const { postId, react,userId } = req.body;
    const check = await CmReactModel.findOne({
      postRef: postId,
      reactBy:new mongoose.Types.ObjectId(req.user.id),
    });
    if (check == null) {
      const newReact = new CmReactModel({
        react: react,
        postRef: postId,
        reactBy: req.user.id,
      });
      await newReact.save();
    } else {
      if (check.react == react) {
        await CmReactModel.findByIdAndRemove(check._id);
      } else {
        await CmReactModel.findByIdAndUpdate(check._id, {
          react: react,
        });
      }
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: error.message });
  }
};
export const getReactsComment = async (req, res) => {
  try {
    const reactsArray = await CmReactModel.find({ postRef: req.params.id }).populate("reactBy");

    /*
    const check1 = reacts.find(
      (x) => x.reactBy.toString() == req.user.id
    )?.react;
    */
    const newReacts = reactsArray.reduce((group, react) => {
      let key = react["react"];
      group[key] = group[key] || [];
      group[key].push(react);
      return group;
    }, {});

    const reacts = [
      {
        react: "like",
        count: newReacts.like ? newReacts.like.length : 0,
      },
      {
        react: "love",
        count: newReacts.love ? newReacts.love.length : 0,
      },
      {
        react: "haha",
        count: newReacts.haha ? newReacts.haha.length : 0,
      },
      {
        react: "sad",
        count: newReacts.sad ? newReacts.sad.length : 0,
      },
      {
        react: "wow",
        count: newReacts.wow ? newReacts.wow.length : 0,
      },
      {
        react: "angry",
        count: newReacts.angry ? newReacts.angry.length : 0,
      },
    ];
   //const user = await userModel.findById(req.user.id);
    const check = await CmReactModel.findOne({
      postRef: req.params.id,
      reactBy: req.user.id,
    });
    const user = await userModel.findById(req.user.id);
    const checkSaved = user?.savedPosts.find((x) => x.post.toString() === req.params.id);
    res.json({
      reacts,
      check: check?.react,
      all:reactsArray,
      total: reactsArray.length,
      checkSaved: checkSaved ? true : false,
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: error.message });
  }
};
//unAuthorize get
export const getReactsCommentUnauth = async (req, res) => {
  try {
    const reactsArray = await CmReactModel.find({ postRef: req.params.id }).populate("reactBy");

    /*
    const check1 = reacts.find(
      (x) => x.reactBy.toString() == req.user.id
    )?.react;
    */
    const newReacts = reactsArray.reduce((group, react) => {
      let key = react["react"];
      group[key] = group[key] || [];
      group[key].push(react);
      return group;
    }, {});

    const reacts = [
      {
        react: "like",
        count: newReacts.like ? newReacts.like.length : 0,
      },
      {
        react: "love",
        count: newReacts.love ? newReacts.love.length : 0,
      },
      {
        react: "haha",
        count: newReacts.haha ? newReacts.haha.length : 0,
      },
      {
        react: "sad",
        count: newReacts.sad ? newReacts.sad.length : 0,
      },
      {
        react: "wow",
        count: newReacts.wow ? newReacts.wow.length : 0,
      },
      {
        react: "angry",
        count: newReacts.angry ? newReacts.angry.length : 0,
      },
    ];
   
   
    res.json({
      reacts,
      all: reactsArray,
      total: reactsArray.length,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
