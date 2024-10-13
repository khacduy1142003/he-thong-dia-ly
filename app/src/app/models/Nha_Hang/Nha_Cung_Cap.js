const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Nha_Cung_Cap = new Schema({
  // _id
  ten: String,
  email: String,
  so_dien_thoai: String,
  dia_chi: String,
  vi_do: String,
  kinh_do: String,
  anh: String,
});

module.exports = mongoose.model("nha_cung_caps", Nha_Cung_Cap);
