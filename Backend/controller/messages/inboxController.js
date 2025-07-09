const { askMuslimAI } = require("../chatGPT/chatGPTMuslim");
const mongoose = require("mongoose");
const messageSchema = require("../../model/message/messageSchema");
const {
  startContextMuslim,
  continueContextMuslim,
} = require("../chatGPT/contextualIslam");
const { GOOGLE, FB } = require("../../constants/defaultConstant");
const conversationSchema = require("../../model/conversations/conversationSchema");
const Conversations = new mongoose.model("Conversations", conversationSchema);
const Messages = new mongoose.model("Messages", messageSchema);

async function getMessages(req, res) {
  try {
    let user_id = req.body.mode === "google" ? req.body.id : req.user.id;
    const msgs = new Messages();
    const messages = await msgs.getAllMessages(user_id, req.body.conv_id);

    res.status(200).json({
      data: {
        messages: messages,
        user: req.body.mode === "google" ? req.body.id : req.user.id,
      },
    });
  } catch (err) {
    res.status(500).json({
      errors: {
        common: {
          msg: "Unknows error occured!",
        },
      },
    });
  }
}

// send new message
async function sendMessage(req, res, next) {
  if (req.body.message) {
    let user_id =
      req.body.mode === GOOGLE || req.body.mode === FB
        ? req.body.id
        : req.user.id;
    let user_name =
      req.body.mode === GOOGLE || req.body.mode === FB
        ? req.body.name
        : req.user.name;
    try {
      const messages = [];
      const newMessage = new Messages({
        text: req.body.message,
        sender: {
          id: user_id,
          name: user_name,
        },
        receiver: {
          id: "643fcd8b42bf687b3898a524",
          name: "ChatBot",
        },
        conversation_id: req.body.conv_id,
      });

      const result = await newMessage.save();
      messages.push(result);

      const { aiMessage, err } = await askMuslimAI(req);
      if (aiMessage) {
        const chatGPTMessage = new Messages({
          text: aiMessage.replace(/\\n|\\|\[|\]|\"/g, ""),
          sender: {
            id: "643fcd8b42bf687b3898a524",
            name: "ChatBot",
            avatar: req.body.avatar || null,
          },
          receiver: {
            id: user_id,
            name: user_name,
          },
          conversation_id: req.body.conv_id,
        });

        let messageStart = aiMessage.replace(/\\n|\\|\[|\]|\"/g, "");
        let cleanMessage = messageStart.split(" ").slice(0, 4).join(" ");

        var updatedConversation;
        const conv = new Conversations();
        updatedConversation = await conv.updateConTime(
          user_id,
          req.body.conv_id,
          cleanMessage
        );

        const result1 = await chatGPTMessage.save();
        messages.push(result1);
        console.log(updatedConversation);
        res.status(200).json({
          message: "Successful",
          updatedCon: updatedConversation,
          data: messages,
        });
      } else if (err) {
        console.log(messages, updatedConversation);
        res.status(500).json({
          data: messages,
          errors: {
            common: {
              msg: err,
            },
          },
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({
        errors: {
          common: {
            msg: err.message,
          },
        },
      });
    }
  } else {
    res.status(500).json({
      errors: {
        common: "message text or attachment is required!",
      },
    });
  }
}

async function contextMessage(req, res, next) {
  if (req.body.message) {
    //console.log(req.body.message);
    try {
      const messages = [];
      const newMessage = new Messages({
        text: req.body.message,
        sender: {
          id: req.user.id,
          name: req.user.name,
          avatar: req.user.avatar || null,
        },
        receiver: {
          id: "643fcd8b42bf687b3898a524",
          name: "ChatBot",
          avatar: req.body.avatar || null,
        },
      });
      //console.log(newMessage);

      const result = await newMessage.save();
      messages.push(result);
      if (req.body.status === "start") {
        var { aiMessageStart, errStart } = await startContextMuslim(req);
        if (aiMessageStart) {
          const chatGPTMessage = new Messages({
            text: aiMessageStart,
            sender: {
              id: "643fcd8b42bf687b3898a524",
              name: "ChatBot",
              avatar: req.body.avatar || null,
            },
            receiver: {
              id: req.user.id,
              name: req.user.name,
              avatar: req.user.avatar || null,
            },
          });

          const result1 = await chatGPTMessage.save();
          messages.push(result1);
          res.status(200).json({
            message: "Successful!",
            data: messages,
          });
        } else if (errStart) {
          res.status(500).json({
            data: messages,
            errors: {
              common: {
                msg: errStart,
              },
            },
          });
        }
      } else {
        var { aiMessageContinue, errContinue } = await continueContextMuslim(
          req
        );
        if (aiMessageContinue) {
          const chatGPTMessage = new Messages({
            text: aiMessageContinue,
            sender: {
              id: "643fcd8b42bf687b3898a524",
              name: "ChatBot",
              avatar: req.body.avatar || null,
            },
            receiver: {
              id: req.user.id,
              name: req.user.name,
              avatar: req.user.avatar || null,
            },
          });

          const result1 = await chatGPTMessage.save();
          messages.push(result1);
          res.status(200).json({
            message: "Successful!",
            data: messages,
          });
        } else if (errContinue) {
          res.status(500).json({
            data: messages,
            errors: {
              common: {
                msg: errContinue,
              },
            },
          });
        }
      }

      // emit socket event
      // global.io.emit("new_message", {
      //   message: {
      //     conversation_id: req.body.conversationId,
      //     sender: {
      //       id: req.user.userid,
      //       name: req.user.username,
      //       avatar: req.user.avatar || null,
      //     },
      //     message: req.body.message,
      //     attachment: attachments,
      //     date_time: result.date_time,
      //   },
      // });
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
  } else {
    res.status(500).json({
      errors: {
        common: "message text or attachment is required!",
      },
    });
  }
}

module.exports = {
  getMessages,
  sendMessage,
  contextMessage,
};
