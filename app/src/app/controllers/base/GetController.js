const NhaHang = require("../../models/NhaHang");
const NguoiDung = require("../../models/Account");
const XaKienGiang = require("../../models/Xa");

const {
  multipleMongooseToObject,
  mongooseToObject,
} = require("../../../util/mongoose");

class GetController {
  // nha hang
  nha_hang(req, res, next) {
    if (!req.cookies.email || !req.cookies.role) {
      res.redirect("/");
    } else {
      NguoiDung.findOne({ email: req.cookies.email })
        .then((nguoi_dung) => {
          NhaHang.find({})
            .then((nha_hang) => {
              res.render("nha_hang", {
                nguoi_dung: mongooseToObject(nguoi_dung),
                nha_hang: multipleMongooseToObject(nha_hang),
              });
            })
            .catch(next);
        })
        .catch(next);
    }
  }

  // chi tiet nha hang
  chi_tiet_nha_hang(req, res, next) {
    NhaHang.findById(req.params._id)
      .then((nha_hang) => {
        res.render("chi_tiet_nha_hang", {
          nha_hang: mongooseToObject(nha_hang),
        });
      })
      .catch(next);
  }

  // admin
  admin(req, res, next) {
    if (req.cookies.email && req.cookies.role === "ADMIN") {
      NguoiDung.findOne({ email: req.cookies.email })
        .then((nguoi_dung) => {
          NhaHang.find({})
            .then((nha_hang) => {
              NguoiDung.find({})
                .then((tat_ca_nguoi_dung) => {
                  XaKienGiang.find({})
                    .then((xa_kien_giang) => {
                      res.render("admin", {
                        nguoi_dung: mongooseToObject(nguoi_dung),
                        nha_hang: multipleMongooseToObject(nha_hang),
                        tat_ca_nguoi_dung:
                          multipleMongooseToObject(tat_ca_nguoi_dung),
                        xa_kien_giang: multipleMongooseToObject(xa_kien_giang),
                      });
                    })
                    .catch(next);
                })
                .catch(next);
            })
            .catch(next);
        })
        .catch(next);
    } else {
      res.redirect("/");
    }
  }

  // dang nhap
  dang_nhap(req, res, _next) {
      res.render("dang_nhap");
  }

  // chi tiet nguoi dung
  chi_tiet_nguoi_dung(req, res, next) {
    NguoiDung.findById(req.params._id)
      .then((nguoi_dung) => {
        res.render("chi_tiet_nguoi_dung", {
          nguoi_dung: mongooseToObject(nguoi_dung),
        });
      })
      .catch(next);
  }

  // dang ky
  dang_ky(_req, res, next) {
    XaKienGiang.find({})
      .then((xa_kien_giang) => {
        res.render("dang_ky", {
          xa_kien_giang: multipleMongooseToObject(xa_kien_giang),
        });
      })
      .catch(next);
  }

  // index
  index(req, res, next) {
    NguoiDung.findOne({ email: req.cookies.email })
      .then((nguoi_dung) => {
        res.render("index", {
          nguoi_dung: mongooseToObject(nguoi_dung),
        });
      })
      .catch(next);
  }
}

module.exports = new GetController();
