const express = require("express");
const {
  fbLogOut,
  fbUserInfo,
  fbTokenValidate,
} = require("../controller/users/fbLogin");

const router = express.Router();

router.post("/fb/user", fbUserInfo);
router.post("/fb/validate", fbTokenValidate);

router.post("/fb/logout", fbLogOut);

module.exports = router;
