const mongoose = require("mongoose");

const SchoolSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    name: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

var School = mongoose.model("School", SchoolSchema);

module.exports = School;
