const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Message = new Schema({
  image: String,
  title: String,
  content: String,
  time: String,
});

module.exports = mongoose.model("messages", Message);
