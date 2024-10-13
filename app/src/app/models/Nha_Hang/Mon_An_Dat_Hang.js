const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Mon_An_Dat_Hang = new Schema({
  // _id
  // id đơn đặt hàng
  // id món ăn
  so_luong: Number,
});

module.exports = mongoose.model("mon_an_dat_hangs", Mon_An_Dat_Hang);
