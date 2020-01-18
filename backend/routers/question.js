const express = require("express");
const Question = require("../models/Question");
const UserAnswer = require("../models/UserAnswer");
const User = require("../models/User");

const Answer = require("../models/Answer");
const auth = require("../middleware/auth");
const router = new express.Router();

router.post("/question/addNew", async (req, res) => {
  try {
    var start = new Date();
    start.setHours(0, 0, 0, 0);
    var end = new Date();
    end.setHours(23, 59, 59, 999);
    let submittedQuestion = await Question.findOne({
      createdAt: { $gte: start, $lt: end }
    });
    if (submittedQuestion) {
      return res
        .status(400)
        .send({ error: "already submitted a question today" });
    }
    const questionToAdd = { ...req.body };
    const question = new Question({
      questionText: questionToAdd.questionText
    })
      .save()
      .then(question => {
        questionToAdd.answers.map(async answer => {
          let answerToAdd = new Answer({
            question_id: question._id,
            answerText: answer.answerText,
            answerScore: answer.answerScore
          });
          await answerToAdd.save();
        });
        res.status(201).send(question);
      });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// GET /question?completed=true
// GET /question?limit=10&skip=20
// GET /question?sortBy=createdAt:desc
router.get("/question/:question_id", auth, async (req, res) => {
  try {
    const question = await Question.findById(req.params.question_id);
    if (!question) {
      return res.send({ message: "question not found" });
    }
    const answers = await Answer.find({ question_id: question._id });
    const questionPreview = {
      question: {
        _id: question._id,
        questionText: question.questionText,
        createdAt: question.createdAt
      },
      answers: [...answers]
    };
    res.send(questionPreview);
  } catch (e) {
    res.send({ e });
  }
});

router.get("/todayQuestion", auth, async (req, res) => {
  try {
    var start = new Date();
    start.setHours(0, 0, 0, 0);
    var end = new Date();
    end.setHours(23, 59, 59, 999);
    let question = await Question.findOne({
      createdAt: { $gte: start, $lt: end }
    });
    if (!question) {
      return res.send({ message: "there is no question for today" });
    }
    const answers = await Answer.find({ question_id: question._id });
    const questionPreview = {
      question: {
        _id: question._id,
        questionText: question.questionText,
        createdAt: question.createdAt
      },
      answers: [...answers]
    };
    res.send(questionPreview);
  } catch (e) {
    res.send({ e: e.message });
  }
});

router.post("/user_answer_question", auth, async (req, res) => {
  try {
    const user_id = req.user.id;
    const { question_id, answer_id, answerScore } = { ...req.body };
    const answeredQuestion = await UserAnswer.findOne({
      question_id,
      user_id
    });
    if (answeredQuestion) {
      return res.status(400).json({ error: "question already answered" });
    }
    const answer = new UserAnswer({
      user_id,
      question_id,
      answer_id
    });
    const user = await User.findById(user_id);
    const score = user.score + answerScore;
    await User.updateOne({ _id: user_id }, { $set: { score } });

    answer.save();
    return res.send(answer);
  } catch (e) {
    return res.status({ e });
  }
});

router.post("/isQuestionAnswered", auth, async (req, res) => {
  try {
    const user_id = req.user.id;
    console.log(req.body);
    const { question_id } = req.body;
    console.log(user_id, question_id);
    const answeredQuestion = await UserAnswer.findOne({
      question_id,
      user_id
    });
    if (answeredQuestion) {
      console.log(answeredQuestion);
      return res.send(answeredQuestion);
    }
    return res.send(false);
  } catch (e) {
    console.log(e);
    return res.status({ e });
  }
});

router.get("/question/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const question = await Question.findOne({ _id, owner: req.user._id });

    if (!question) {
      return res.status(404).send();
    }

    res.send(question);
  } catch (e) {
    res.status(500).send();
  }
});

router.patch("/question/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const question = await question.findOne({
      _id: req.params.id,
      owner: req.user._id
    });

    if (!question) {
      return res.status(404).send();
    }

    updates.forEach(update => (question[update] = req.body[update]));
    await question.save();
    res.send(question);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/question/:id", auth, async (req, res) => {
  try {
    const question = await Question.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id
    });

    if (!question) {
      res.status(404).send();
    }

    res.send(question);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/questions/all", auth, async (req, res) => {
  try {
    const questions = await Question.find();

    res.send(questions);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
