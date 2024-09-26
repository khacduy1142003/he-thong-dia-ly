const NhaHang = require("../../models/NhaHang");
const NguoiDung = require("../../models/Account");

class DeleteController {
  // nha hang
  nha_hang(req, res, next) {
    NhaHang.deleteOne({ _id: req.params._id })
      .then(() => res.redirect("back"))
      .catch(next);
  }

  // nguoi dung
  nguoi_dung(req, res, next) {
    NguoiDung.deleteOne({ _id: req.params._id })
      .then(() => res.redirect("back"))
      .catch(next);
  }
}

module.exports = new DeleteController();
