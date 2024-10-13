const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Don_Dat_Hang = new Schema({
  // _id
  // id khách hàng
  // id mon an
  // id nhà hàng
  id_mon_an: String,
  id_khach_hang: String,
  id_nha_hang: String,
  ten_nha_hang: String,
  ten_khach_hang: String,
  mon_an: String,
  anh: String,
  gia: Number,
  ngay_dat_hang: String,
  trang_thai: String,
});

module.exports = mongoose.model("don_dat_hangs", Don_Dat_Hang);
