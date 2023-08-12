
import Message from "../../Model/message/message.model.js";
import Conversation from "../../Model/message/conversation.model.js";

export const createMessage = async (req, res, next) => {
  const newMessage = new Message({
    conversationId: req.body.conversationId,
    userId: req.userId,
    desc: req.body.desc,
    user: req.avatar,
  });
  try {
    const savedMessage = await newMessage.save();
    await Conversation.findOneAndUpdate(
      { id: req.body.conversationId },
      {
        $set: {
          readBySender: req. isActiveUser,
          readByReceiver: !req. isActiveUser,
          lastMessage: req.body.desc,
         
        },
      },
      { new: true }
    );

    res.status(201).send(savedMessage);
  } catch (err) {
    next(err);
  }
};
export const getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find({ conversationId: req.params.id }).populate("user");
    res.status(200).send(messages);
  } catch (err) {
    next(err);
  }
};
