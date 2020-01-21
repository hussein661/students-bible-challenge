const mongoose = require("mongoose");

const LevelSchema = new mongoose.Schema(
  {
    _id: { type: Number, required: true, unique: true, enum: [1, 2, 3] },

    Name: {
      type: Number
    }
  },
  {
    timestamps: true
  }
);

var Level = mongoose.model("Level", LevelSchema);

module.exports = Level;
