const mongoose = require("mongoose");
const { diffCurrentDate, getCurrentDate } = require("../../functions/common");
const ObjectId = require("mongodb").ObjectId;

const conversationSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    user: {
      id: mongoose.Types.ObjectId,
      name: String,
    },
    limit_reached: {
      type: String,
    },
    isActive: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

conversationSchema.methods = {
  updateConTime: function (ID, CONV_ID, NAME) {
    return mongoose.model("Conversations").findOneAndUpdate(
      {
        $and: [{ "user.id": ID }, { _id: CONV_ID }],
      },
      [
        {
          $set: {
            updatedAt: new Date(),
          },
        },
        {
          $set: {
            name: NAME,
          },
        },
        {
          $set: {
            delay: 0,
          },
        },
        {
          $set: {
            isActive: "Today",
          },
        },
      ],
      {
        new: true,
      }
    );
  },
  getAllConversations: async function (ID) {
    return mongoose
      .model("Conversations")
      .find({ "user.id": ID })
      .sort("-createdAt")
      .then((conversations) => {
        // Add the custom key-value pair to each conversation document
        const updatedConversations = conversations.map((conversation) => {
          conversation["limit_reached"] = "no";
          conversation["isActive"] =
            diffCurrentDate(
              getCurrentDate(null),
              getCurrentDate(conversation.createdAt)
            ) === 0
              ? "Today"
              : diffCurrentDate(
                  getCurrentDate(null),
                  getCurrentDate(conversation.createdAt)
                ) === 1
              ? "Yesterday"
              : "Previous 30 Days";
          return conversation;
        });

        // Use findOneAndUpdate to update and return the modified documents
        const updatePromises = updatedConversations.map(
          (updatedConversation) => {
            return mongoose
              .model("Conversations")
              .findOneAndUpdate(
                { _id: updatedConversation._id },
                updatedConversation,
                { new: true }
              );
          }
        );

        return Promise.all(updatePromises);
      });
  },
  newlyAddedConMessage: async function name(ID) {
    return mongoose
      .model("Conversations")
      .aggregate([
        {
          $match: { _id: new ObjectId(ID) },
        },
        {
          $lookup: {
            from: "messages",
            localField: "_id",
            foreignField: "conversation_id",
            as: "messageList",
          },
        },
        {
          $addFields: {
            delay: {
              $divide: [
                { $subtract: [new Date(), "$updatedAt"] },
                86400000, // Number of milliseconds in a day
              ],
            },
          },
        },
        {
          $addFields: {
            isActive: "Today",
          },
        },
        {
          $sort: { delay: 1 }, // Sort by "delay" in ascending order
        },
        {
          $group: {
            _id: "$isActive",
            conversation: { $push: "$$ROOT" },
            total_conversation: { $count: {} },
          },
        },
      ])
      .sort({ delay: -1 });
  },
  getAllConvWithMessage: async function name(ID) {
    return mongoose.model("Conversations").aggregate([
      {
        $match: { "user.id": new ObjectId(ID) },
      },
      {
        $lookup: {
          from: "messages",
          localField: "_id",
          foreignField: "conversation_id",
          as: "messageList",
        },
      },
      {
        $addFields: {
          delay: {
            $divide: [
              { $subtract: [new Date(), "$updatedAt"] },
              86400000, // Number of milliseconds in a day
            ],
          },
        },
      },
      {
        $addFields: {
          isActive: {
            $cond: {
              if: { $lt: ["$delay", 1] },
              then: "Today",
              else: {
                $cond: {
                  if: {
                    $and: [{ $gt: ["$delay", 1] }, { $lt: ["$delay", 2] }],
                  },
                  then: "Yesterday",
                  else: "Previous 30 Days",
                },
              },
            },
          },
        },
      },
      {
        $sort: { delay: 1 },
      },
      {
        $group: {
          _id: "$isActive",
          conversation: { $push: "$$ROOT" },
          total_conversation: { $count: {} },
        },
      },
    ]);
  },
  deleteConversation: function (ID, conv_id) {
    return mongoose.model("Conversations").deleteOne({
      $and: [{ "user.id": ID }, { _id: conv_id }],
    });
  },
};

module.exports = conversationSchema;
