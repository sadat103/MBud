const express = require("express");

const {
  addUser,
  verifyOtp,
  resendOtp,
} = require("../controller/users/usrInfoConroller");
const { addUserValidators } = require("../middlewares/users/userValidators");

const router = express.Router();

//router.get("/", requireRole("admin"), getUsers);
router.post("/add", addUserValidators, addUser);
router.post("/verifyOtp", verifyOtp);
router.post("/reOtp", resendOtp);

module.exports = router;
