const mongoose = require("mongoose");
const { NORMAL } = require("../../constants/defaultConstant");

const personalInfoSchem = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    mobile: {
      type: Number,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    image: {
      type: String,
    },
    refresh_token: {
      type: String,
    },
    is_verified: {
      type: Boolean,
    },
    user_mode: {
      type: String,
    },
    password: {
      type: String,
      required: function () {
        return this.user_mode === NORMAL;
      },
    },
    theme: {
      type: String,
      required: true,
    },
    upgraded: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

personalInfoSchem.methods = {
  findUser: function (EMAIL, MODE) {
    return mongoose.model("PersonalInfo").findOne({
      $and: [{ email: EMAIL }, { user_mode: MODE }],
    });
  },
  findUserById: function (ID, MODE) {
    return mongoose.model("PersonalInfo").findOne({
      $and: [{ _id: ID }, { user_mode: MODE }],
    });
  },
  userPasswordUpdate: function (ID, PASSWORD) {
    return mongoose.model("PersonalInfo").updateOne(
      {
        _id: ID,
      },
      { password: PASSWORD }
    );
  },
  userVerUpdate: function (ID) {
    return mongoose.model("PersonalInfo").updateOne(
      {
        _id: ID,
      },
      { is_verified: true }
    );
  },
  userInsert: function (NAME) {
    return mongoose.model("PersonalInfo").insertOne({
      name: NAME,
      email: "",
      password: "",
    });
  },
};

module.exports = personalInfoSchem;
