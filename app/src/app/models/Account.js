const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Account = new Schema({
  fullname: String,
  username: String,
  email: String,
  password: String,
  address: String,
  role: String,
  phone: String,
  status: String,
  avatar: String,
});

module.exports = mongoose.model("accounts", Account);
