const express = require("express");

const { checkLogin, isLoggedin } = require("../middlewares/common/checkLogin");
const {
  addConversations,
  getConversations,
  deleteConversation,
} = require("../controller/conversations/conversationController");

const router = express.Router();

router.post("/allconversation", isLoggedin, getConversations);

// send message
router.post("/addConversation", isLoggedin, addConversations);
router.post("/deleteConversation", isLoggedin, deleteConversation);

module.exports = router;
