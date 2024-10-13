const NhaHang = require("../../models/Nha_Hang/Nha_Cung_Cap");
const NguoiDung = require("../../models/Account");
const MonAn = require("../../models/Nha_Hang/Mon_An");
const DonDatHang = require("../../models/Nha_Hang/Don_Dat_Hang");

class DeleteController {
  // nha hang
  nha_hang(req, res, next) {
    NhaHang.deleteOne({ _id: req.params._id })
      .then(() => {
        DonDatHang.deleteMany({id_nha_hang: req.params._id})
        .then(() => {
          res.redirect("back")
        })
        .catch(next);
      })
      .catch(next);
  }

  // nguoi dung
  nguoi_dung(req, res, next) {
    NguoiDung.deleteOne({ _id: req.params._id })
      .then(() => res.redirect("back"))
      .catch(next);
  }

   // Món Ăn
   mon_an(req, res, next) {
    MonAn.deleteOne({ _id: req.params._id })
      .then(() => res.redirect("back"))
      .catch(next);
  }

  // Đơn đặt Hàng
  don_dat_hang(req, res, next) {
    DonDatHang.deleteOne({_id: req.params._id})
     .then(() => res.redirect("back"))
     .catch(next);
  }
}

module.exports = new DeleteController();
