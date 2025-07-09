const mongoose = require("mongoose");
const { NORMAL } = require("../../constants/defaultConstant");

const userVerficationSchem = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userVerficationSchem.methods = {
  findOtp: function (USER_ID) {
    return mongoose
      .model("UserVerification")
      .find({
        user_id: USER_ID,
      })
      .sort("-createdAt");
  },
  deleteOtp: function (USER_ID) {
    return mongoose.model("UserVerification").deleteMany({
      user_id: USER_ID,
    });
  },
};

module.exports = userVerficationSchem;
