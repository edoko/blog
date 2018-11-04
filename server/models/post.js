const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let PostSchema = new Schema({
  title: {
    type: String
  },
  content: {
    type: String
  },
  writer: {
    type: String
  },
  date: {
    type: Date,
    default: () => new Date().getTime() + 1000 * 60 * 60 * 9
  }
});

module.exports = mongoose.model("Post", PostSchema);
