const mongoose = require("mongoose");

const msgComScheme = mongoose.Schema(
  {
    comment: {
      type: String,
    },
    opinion: {
      type: String,
    },
    message_id: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    date_time: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

msgComScheme.methods = {
  setOpinionMessage: function (MSG_ID, OPINION) {
    return mongoose.model("MessageComment").findOneAndUpdate(
      {
        message_id: MSG_ID,
      },
      {
        opinion: OPINION,
      }
    );
  },
  setCommentMessage: function (ID, MSG_ID) {
    return mongoose.model("MessageComment").deleteMany({
      $and: [
        {
          $or: [{ "sender.id": ID }, { "receiver.id": ID }],
        },
        { conversation_id: MSG_ID },
      ],
    });
  },
  deleteComment: function (MSG_ID) {
    return mongoose.model("MessageComment").deleteOne({
      message_id: MSG_ID,
    });
  },
};

module.exports = msgComScheme;
