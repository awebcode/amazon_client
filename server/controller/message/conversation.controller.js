import Conversation from "../../Model/message/conversation.model.js";

export const createConversation = async (req, res, next) => {
  const newConversation = new Conversation({
    id: req.isActiveUser ? req.userId + req.body.to : req.body.to + req.userId,
    senderId: req.isActiveUser ? req.userId : req.body.to,
    receiverId: req.isActiveUser ? req.body.to : req.userId,
    readBySender: req.isActiveUser,
    readByReceiver: !req.isActiveUser,
    user: req.user
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(201).send(savedConversation);
  } catch (err) {
    next(err);
  }
};

export const updateConversation = async (req, res, next) => {
  try {
    const updatedConversation = await Conversation.findOneAndUpdate(
      { id: req.params.id },
      {
        $set: {
          // readBySender: true,
          // readByReceiver: true,
          ...(req.isActiveUser ? { readBySender: true } : { readByReceiver: true }),
        },
      },
      { new: true }
    );

    res.status(200).send(updatedConversation);
  } catch (err) {
    next(err);
  }
};

export const getSingleConversation = async (req, res, next) => {
  try {
    const conversation = await Conversation.findOne({ id: req.params.id });
    if (!conversation) return res.status(404).json({ msg: "Not Found" });
    res.status(200).send(conversation);
  } catch (err) {
    next(err);
  }
};

export const getConversations = async (req, res, next) => {
  try {
   
    const conversations = await Conversation.find()
      .sort({ updatedAt: -1 })
      .populate("user");
      res.status(200).send(conversations);
  } catch (err) {
    next(err);
  }
};
