const express = require("express");

const { isLoggedin } = require("../middlewares/common/checkLogin");
const { askMuslimAI } = require("../controller/chatGPT/chatGPTMuslim");
const {
  sendMessage,
  getMessages,
  contextMessage,
} = require("../controller/messages/inboxController");

const router = express.Router();

router.post("/aiResponse", isLoggedin, askMuslimAI);

router.post("/allmessages", isLoggedin, getMessages);

// send message
router.post("/sendmessage", isLoggedin, sendMessage);

router.post("/contextmessage", isLoggedin, contextMessage);

module.exports = router;
