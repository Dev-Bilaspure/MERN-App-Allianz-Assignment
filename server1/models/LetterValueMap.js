const mongoose = require("mongoose");

const LetterValueMapSchema = new mongoose.Schema(
  {
    letter: {
      type: String,
      required: true,
      unique: true
    },
    value: {
      type: String,
      require: true
    }
  }
);

module.exports = mongoose.model("LetterValueMap", LetterValueMapSchema);