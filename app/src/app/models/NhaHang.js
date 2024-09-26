const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const NhaHang = new Schema({
    name: String,
    image: String,
    index: {
        vido: String,
        kinhdo: String,
    },
    address: String,
    time: String,
    about: String,
    travel: String,
});

module.exports = mongoose.model("nhahang", NhaHang);
