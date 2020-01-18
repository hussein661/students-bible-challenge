const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://square:k9iaIzkVdYLWZ47A@mycluster-6xut5.mongodb.net/students_challenge?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }
);
