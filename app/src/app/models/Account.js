const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Account = new Schema(
    {   username: String,
        email: String,
        password: String,
        address: String,
        role: String,
    }
);

module.exports = mongoose.model('accounts', Account);
