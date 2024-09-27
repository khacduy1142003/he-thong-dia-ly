const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Order = new Schema({
    email: String,
    name: String,
    username: String,
    status: String,
    total: Number,
    ngay_dat: Date,
    ngay_giao_hang: Date,
    address_user: String,
    address_index: String,
    ghi_chu: String,
});

module.exports = mongoose.model("orders", Order);
