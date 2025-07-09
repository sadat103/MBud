const mongoose = require("mongoose");

const personPrefSchema = mongoose.Schema(
  {
    rating: {
      type: Number,
    },
    feature_request: {
      type: String,
    },
    user_id: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

personPrefSchema.methods = {
  findUserPref: function (USER_ID) {
    return mongoose.model("PersonalPref").findOne({
      user_id: USER_ID,
    });
  },
};

module.exports = personPrefSchema;
