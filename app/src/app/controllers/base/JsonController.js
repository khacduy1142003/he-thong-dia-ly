// model
const NhaHang = require("../../models/NhaHang");
const NguoiDung = require("../../models/Account");


// other
const {
  multipleMongooseToObject,
  mongooseToObject,
} = require("../../../util/mongoose");

class JsonController {
  // nha hang
  json_nha_hang(req, res, next) {
    NhaHang.find({})
      .then((nha_hang) => {
        res.json(nha_hang);
      })
      .catch(next);
  }

  // nguoi dung
  json_nguoi_dung(req, res, next) {
    NguoiDung.find({})
      .then((nguoi_dung) => {
        res.json(nguoi_dung);
      })
      .catch(next);
  }

}

module.exports = new JsonController();
