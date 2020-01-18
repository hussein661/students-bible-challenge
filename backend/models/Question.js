const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema(
  {
    questionText: {
      type: String,
      required: true
    },
    level: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

var Question = mongoose.model("Question", QuestionSchema);

module.exports = Question;
