const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { NORM } = require("../../constants/defaultConstant");
const { signUpOtpVerficationEmail } = require("../common/otpVerfication");
const personalInfoSchem = require("../../model/Users/personalInfoSchem");
const userVerficationSchem = require("../../model/Users/userVerficationSchem");
const conversationSchema = require("../../model/conversations/conversationSchema");
const personPrefSchema = require("../../model/Users/personPrefSchema");
const UserVerification = new mongoose.model(
  "UserVerification",
  userVerficationSchem
);

const PersonalPref = new mongoose.model("PersonalPref", personPrefSchema);
const PersonalInfo = new mongoose.model("PersonalInfo", personalInfoSchem);
const Conversations = new mongoose.model("Conversations", conversationSchema);

async function addUser(req, res, next) {
  console.log(req.body);
  try {
    const personalInfo = new PersonalInfo();
    const result = await personalInfo.findUser(req.body.email, NORM);
    console.log(result);
    if (result) {
      if (!result.is_verified) {
        signUpOtpVerficationEmail(result, res);
      } else if (result.is_verified) {
        res.status(200).json({
          message: "User already exist please go to log in page",
        });
      }
    } else {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      console.log(hashedPassword);
      try {
        const adduser = new PersonalInfo({
          name: req.body.name,
          email: req.body.email,
          password: hashedPassword,
          is_verified: false,
          theme: "DEFAULT",
          user_mode: NORM,
          upgraded: false,
        });
        adduser
          .save()
          .then((result) => {
            signUpOtpVerficationEmail(result, res);
          })
          .catch((error) => {
            res.status(500).json({
              errors: {
                common: {
                  msg: error,
                },
              },
            });
          });
      } catch (err) {
        res.status(500).json({
          errors: {
            common: {
              msg: err,
            },
          },
        });
      }
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

async function verifyOtp(req, res) {
  try {
    const userVerification = new UserVerification();
    const personalInfo = new PersonalInfo();
    const otpList = await userVerification.findOtp(req.body.user_id);
    console.log(otpList);
    if (otpList.length === 0) {
      res.status(200).json({
        message:
          "Account does not exist or verified already please go to login page",
      });
    } else {
      const { expiresAt } = otpList[0];
      const hashedOtp = otpList[0].otp;
      if (expiresAt < Date.now()) {
        res.status(200).json({
          message:
            "Otp expires please press resend for requesting for otp again.",
        });
      } else {
        const validOtp = await bcrypt.compare(req.body.otp, hashedOtp);

        if (!validOtp) {
          res.status(200).json({
            message: "Invalid OTP. Please check your inbox again.",
          });
        } else {
          const verifiedUser = await personalInfo.userVerUpdate(
            req.body.user_id
          );
          const deleteOtp = await userVerification.deleteOtp(req.body.user_id);
          if (deleteOtp && verifiedUser) {
            const addPref = new PersonalPref({
              user_id: req.body.user_id,
              feature_request: false,
            });
            const resultPref = await addPref.save();

            const newConvr = new Conversations({
              name: "unknown",
              user: {
                id: req.body.user_id,
                name: req.body.name,
              },
              limit_reached: "no",
            });

            const resultConv = await newConvr.save();
            res.status(200).json({
              status: "Success",
              message: "Your ID verification successful",
              verifiedUser,
              resultPref,
              resultConv,
            });
          }
        }
      }
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

async function resendOtp(req, res) {
  try {
    const userVerification = new UserVerification();
    const { user_id, email } = req.body;
    if (!user_id || !email) {
      await userVerification.deleteOtp(user_id);
      res.status(200).json({
        message: "Provide email address again",
      });
    } else {
      await userVerification.deleteOtp(user_id);
      signUpOtpVerficationEmail({ _id: user_id, email }, res);
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

module.exports = {
  addUser,
  verifyOtp,
  resendOtp,
};
