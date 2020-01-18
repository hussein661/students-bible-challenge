const express = require("express");
const UserAnswer = require("../models/UserAnswer");
const auth = require("../middleware/auth");
const router = new express.Router();

router.get("/myanswers", auth, async (req, res) => {
  try {
    const answers = await UserAnswer.find({ user_id: req.user.id })
      .populate("question_id")
      .populate("answer_id");

    const myanswers = [];
    answers.map(answer => {
      myanswers.push({
        question: answer.question_id.questionText,
        answer: answer.answer_id.answerText,
        date: answer.createdAt
      });
    });
    console.log(myanswers);
    res.send({ myanswers });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

module.exports = router;
