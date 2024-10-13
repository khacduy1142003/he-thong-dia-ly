// model
const NhaHang = require("../../models/Nha_Hang/Nha_Cung_Cap");
const NguoiDung = require("../../models/Account");
const MonAn = require("../../models/Nha_Hang/Mon_An");
const DonDatHang = require("../../models/Nha_Hang/Don_Dat_Hang");

// other
const {
  multipleMongooseToObject,
  mongooseToObject,
} = require("../../../util/mongoose");
const { nguoi_dung } = require("./PostController");

class JsonController {
  // nha hang
  json_nha_hang(req, res, next) {
    NhaHang.find({})
      .then((nha_hang) => {
        res.json(nha_hang);
      })
      .catch(next);
  }

  // chi tiet nha hang
  json_chi_tiet_nha_hang(req, res, next) {
    NhaHang.findById(req.params._id)
      .then((chi_tiet_nha_hang) => {
        res.json(chi_tiet_nha_hang);
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

  // Đơn Đặt Hàng
  json_don_dat_hang(req, res, next) {
    DonDatHang.find({id_nha_hang: req.params._id})
      .then((don_dat_hang) => {
        res.json(don_dat_hang);
      })
      .catch(next);
  }

  // Tat ca don dat hang
  json_tat_ca_don_dat_hang(req, res, next) {
    DonDatHang.find({})
    .then((don_dat_hang) => {
      res.json(don_dat_hang);
    })
    .catch(next);
  }

  // Khách Hàng
  json_khach_hang(req, res, next) {
    NguoiDung.find({_id: req.params._id})
      .then((khach_hang) => {
        res.json(khach_hang);
      })
      .catch(next);
  }

  // Món Ăn
  json_mon_an(req, res, next) {
    MonAn.find({_id: req.params._id})
      .then((mon_an) => {
        res.json(mon_an);
      })
      .catch(next);
  }
}

module.exports = new JsonController();
