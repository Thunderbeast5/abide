const mongoose = require("mongoose");

const ProgressSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  levelFile: { type: String, required: true },
  lastLesson: { type: Number, default: 0 }
});

module.exports = mongoose.model("Progress", ProgressSchema);