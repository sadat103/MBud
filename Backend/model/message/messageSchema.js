const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    text: {
      type: String,
    },
    sender: {
      id: mongoose.Types.ObjectId,
      name: String,
      avatar: String,
    },
    receiver: {
      id: mongoose.Types.ObjectId,
      name: String,
      avatar: String,
    },
    conversation_id: {
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

messageSchema.methods = {
  getAllMessages: function (ID, CONV_ID) {
    return mongoose
      .model("Messages")
      .find({
        $and: [
          { $or: [{ "sender.id": ID }, { "receiver.id": ID }] },
          { conversation_id: CONV_ID },
        ],
      })
      .sort("-createdAt");
  },
  deleteMessages: function (ID, CONV_ID) {
    return mongoose.model("Messages").deleteMany({
      $and: [
        {
          $or: [{ "sender.id": ID }, { "receiver.id": ID }],
        },
        { conversation_id: CONV_ID },
      ],
    });
  },
  deleteSpecificMessage: function (ID, MSG_ID) {
    return mongoose.model("Messages").deleteOne({
      $and: [
        {
          $or: [{ "sender.id": ID }, { "receiver.id": ID }],
        },
        { _id: MSG_ID },
      ],
    });
  },
};

module.exports = messageSchema;
