const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Mon_An = new Schema({
  // _id
  anh: String,
  ten: String,
  mo_ta: String,
  gia: Number,
});

module.exports = mongoose.model("mon_ans", Mon_An);
