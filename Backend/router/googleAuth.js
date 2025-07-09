const express = require("express");
const {
  googleLogOut,
  googleUserInfo,
  googleTokenValidate,
} = require("../controller/users/googleLogin");

const router = express.Router();

router.post("/google/user", googleUserInfo);
router.post("/google/validate", googleTokenValidate);

router.post("/google/logout", googleLogOut);

module.exports = router;
