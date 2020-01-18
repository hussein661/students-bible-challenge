const express = require("express");
const bodyParser = require("body-parser");
require("./db/mongoose");
const cors = require("cors");

const questionRouter = require("./routers/question");
const userRouter = require("./routers/user");
const answerRouter = require("./routers/answer");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Authorization, refresh"
  );
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json());
app.use(userRouter);
app.use(questionRouter);
app.use(answerRouter);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
