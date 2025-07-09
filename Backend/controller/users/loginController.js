const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const mongoose = require("mongoose");
const personalInfoSchem = require("../../model/Users/personalInfoSchem");
const { NORM } = require("../../constants/defaultConstant");
const { signUpOtpVerficationEmail } = require("../common/otpVerfication");
const PersonalInfo = new mongoose.model("PersonalInfo", personalInfoSchem);

async function getLoginUser(req, res, next) {
  try {
    const personalInfo = new PersonalInfo();
    const user = await personalInfo.findUser(req.body.email, NORM);
    if (user) {
      if (user.is_verified) {
        const isValidPassword = await bcrypt.compare(
          req.body.password,
          user.password
        );
        if (isValidPassword) {
          const userObject = {
            id: user.id,
            name: user.name,
            email: user.email,
          };
          console.log(userObject);
          const token = jwt.sign(userObject, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRY,
          });
          res.cookie(process.env.COOKIE_NAME, token, {
            maxAge: process.env.JWT_EXPIRY,
            httpOnly: true,
            signed: true,
          });
          res.locals.loggedInUser = userObject;
          res.status(200).json({
            token: token,
            message: "success",
            userInfo: {
              name: user.name,
              email: user.email,
              id: user.id,
            },
          });
        } else {
          throw createError("Passowrd doesn't match");
        }
      } else if (!user.is_verified) {
        res.status(200).json({
          message: "User is not verified. Please go to signup page to verify",
        });
      }
    } else {
      res.status(200).json({
        message: "User doesn't exist. Please create a new user",
      });
    }
  } catch (err) {
    res.status(500).json({
      data: {
        name: req.body.name,
      },
      errors: {
        common: {
          msg: err.message,
        },
      },
    });
  }
}

async function otpForPasswordChange(req, res, next) {
  try {
    const personalInfo = new PersonalInfo();
    const user = await personalInfo.findUser(req.body.email, NORM);
    if (user) {
      signUpOtpVerficationEmail(user, res);
    } else {
      throw createError("User doesn't exist. Please create a new user");
    }
  } catch (err) {
    res.status(500).json({
      data: {
        name: req.body.name,
      },
      errors: {
        common: {
          msg: err.message,
        },
      },
    });
  }
}

async function newPassword(req, res, next) {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const personalInfo = new PersonalInfo();
    console.log(req.body.user_id);
    const user = await personalInfo.userPasswordUpdate(
      req.body.user_id,
      hashedPassword
    );
    console.log(user);
    if (user) {
      res.status(200).json({
        message: "success",
        userInfo: {
          name: user.name,
          email: user.email,
        },
      });
    } else {
      throw createError("User doesn't exist. Please create a new user");
    }
  } catch (err) {
    res.status(500).json({
      data: {
        name: req.body.name,
      },
      errors: {
        common: {
          msg: err.message,
        },
      },
    });
  }
}

function logout(req, res) {
  res.clearCookie(process.env.COOKIE_NAME);
  res.status(200).json({
    message: "logged out",
  });
}
module.exports = {
  getLoginUser,
  newPassword,
  otpForPasswordChange,
  logout,
};
