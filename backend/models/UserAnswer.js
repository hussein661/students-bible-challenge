const mongoose = require("mongoose");

const UserAnswerSchema = new mongoose.Schema(
  {
    answer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Answer"
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    question_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Question"
    }
  },
  {
    timestamps: true
  }
);

const UserAnswer = mongoose.model("UserAnswer", UserAnswerSchema);

module.exports = UserAnswer;
