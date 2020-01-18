const mongoose = require("mongoose");

const AnswerSchema = new mongoose.Schema(
  {
    answerText: {
      type: String,
      required: true
    },
    answerScore: {
      type: String
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

const Answer = mongoose.model("Answer", AnswerSchema);

module.exports = Answer;
