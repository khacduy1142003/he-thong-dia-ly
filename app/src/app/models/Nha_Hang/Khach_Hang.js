const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Khach_hang = new Schema({
  // _id
  ten: String,
  email: String,
  so_dien_thoai: String,
  dia_chi: String,
});

module.exports = mongoose.model("khach_hangs", Khach_hang);
