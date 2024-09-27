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
    orders: [
        {
            orders_name: String,
            price: Number,
            status: String,
        }
    ],
    content: [
        {
            email: String,
            username: String,
            start: Number,
            comment: String,
        },
    ]
});

module.exports = mongoose.model("nhahang", NhaHang);
