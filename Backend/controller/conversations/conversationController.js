const { GOOGLE, FB } = require("../../constants/defaultConstant");
const conversationSchema = require("../../model/conversations/conversationSchema");
const messageSchema = require("../../model/message/messageSchema");
const mongoose = require("mongoose");
const Conversations = new mongoose.model("Conversations", conversationSchema);
const Messages = new mongoose.model("Messages", messageSchema);

async function getConversations(req, res) {
  try {
    let user_id =
      req.body.mode === GOOGLE || req.body.mode === FB
        ? req.body.id
        : req.user.id;
    const conv = new Conversations();
    const convs = await conv.getAllConvWithMessage(user_id);
    if (convs.length === 0) {
      res.status(200).json({
        message: "No conversations",
        conversations: [],
        token: res.locals.token,
      });
    } else {
      res.status(200).json({
        conversations: convs,
        token: res.locals.token,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      errors: {
        common: {
          msg: err,
        },
      },
    });
  }
}

// send new message
async function addConversations(req, res, next) {
  const conv = new Conversations();

  try {
    const newConvr = new Conversations({
      name: "Ask anything",
      user: {
        id:
          req.body.mode === GOOGLE || req.body.mode === FB
            ? req.body.id
            : req.user.id,
        name:
          req.body.mode === GOOGLE || req.body.mode === FB
            ? req.body.name
            : req.user.name,
      },
      limit_reached: "no",
      isActive: "Today",
      delay: 1,
    });

    const result = await newConvr.save();
    if (result) {
      console.log(result);
      const convs = await conv.newlyAddedConMessage(result._id);
      res.status(200).json({
        message: "Successful!",
        data: convs,
      });
    }
  } catch (err) {
    //console.log(err);
    res.status(500).json({
      errors: {
        common: {
          msg: err.message,
        },
      },
    });
  }
}

async function deleteConversation(req, res) {
  try {
    const conv = new Conversations();
    const msg = new Messages();
    const convs = await conv.deleteConversation(req.user.id, req.body.conv_id);
    console.log(req.user.id, req.body.conv_id);
    const msgs = await msg.deleteMessages(req.user.id, req.body.conv_id);

    if (convs && msgs) {
      console.log("convs", convs);
      console.log("msgs", msgs);
      const lists = await conv.getAllConversations(req.user.id);
      res.status(200).json({
        data: {
          conversaion: `${convs} conversation and ${msgs} messages deleted`,
          list: lists,
          message: "Delete successful",
          user: req.user.id,
        },
      });
    } else {
      console.log(convs);
      res.status(200).json({
        data: {
          conversations: convs,
          message: "No conversations",
        },
      });
    }
  } catch (err) {
    //console.log(err);
    res.status(500).json({
      errors: {
        common: {
          msg: err.message,
        },
      },
    });
  }
}

module.exports = {
  getConversations,
  addConversations,
  deleteConversation,
};
