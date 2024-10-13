const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const NhaHang = new Schema({
    ten_nha_hang: String,
    index: {
        vido: String,
        kinhdo: String,
    },
    avatar: String,
    email: String,
    address: String,
});

module.exports = mongoose.model("nhahang", NhaHang);
