const express = require("express");

const {
  redirectLoggedIn,
  checkLogin,
  isLoggedin,
} = require("../middlewares/common/checkLogin");
const {
  doLoginValidationHandler,
  doLoginValidatorsEmail,
  doLoginValidatorsPassword,
} = require("../middlewares/login/loginValidators");
const {
  getLoginUser,
  logout,
  otpForPasswordChange,
  newPassword,
} = require("../controller/users/loginController");

const router = express.Router();

router.post(
  "/login",
  doLoginValidatorsEmail,
  doLoginValidatorsPassword,
  doLoginValidationHandler,
  redirectLoggedIn,
  getLoginUser
);
router.post(
  "/otpPassword",
  doLoginValidatorsEmail,
  doLoginValidationHandler,
  otpForPasswordChange
);
router.post(
  "/updatePassword",
  doLoginValidatorsPassword,
  doLoginValidationHandler,
  newPassword
);
router.get("/loggedin", checkLogin);

router.delete("/", logout);

module.exports = router;
