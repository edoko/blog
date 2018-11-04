const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    require: true
  },
  nick: {
    type: String,
    required: true
  },
  provider: {
    type: String,
    required: true
  },
  snsId: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("User", UserSchema);
