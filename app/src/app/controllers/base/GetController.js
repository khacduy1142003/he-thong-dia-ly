const NhaHang = require("../../models/Nha_Hang/Nha_Cung_Cap");
const NguoiDung = require("../../models/Account");
const XaKienGiang = require("../../models/Xa");
const MonAn = require("../../models/Nha_Hang/Mon_An");
const DonDatHang = require("../../models/Nha_Hang/Don_Dat_Hang");
const Message = require("../../models/message");

const {
  multipleMongooseToObject,
  mongooseToObject,
  reverseData,
} = require("../../../util/mongoose");
const message = require("../../models/message");

const ngayThangNam = new Date().toLocaleDateString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });

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
              Message.find({ time: ngayThangNam })
                .then((message) => {
                  res.render("nha_hang", {
                    nguoi_dung: mongooseToObject(nguoi_dung),
                    nha_hang: multipleMongooseToObject(nha_hang),
                    message: multipleMongooseToObject(message),
                  });
                })
                .catch(next);
            })
            .catch(next);
        })
        .catch(next);
    }
  }

  danh_sach_nha_hang(req, res, next) {
    if (!req.cookies.email || !req.cookies.role) {
      res.redirect("/");
    } else {
      NguoiDung.findOne({ email: req.cookies.email })
        .then((nguoi_dung) => {
          NhaHang.find({})
            .then((nha_hang) => {
              const length_nha_hang = nha_hang.length;
              XaKienGiang.find({})
                .then((xa_kien_giang) => {
                  NguoiDung.find({ role: "Quản Lý" })
                    .then((nguoi_dung_quan_li) => {
                      DonDatHang.find({ trang_thai: "chưa giao" })
                        .then((mon_an_chua_giao) => {
                          const length_mon_an_chua_giao =
                            mon_an_chua_giao.length;
                          DonDatHang.find({ trang_thai: "đã giao" })
                            .then((mon_an_da_giao) => {
                              Message.find({ time: ngayThangNam })
                                .then((message) => {
                                  const length_mon_an_da_giao =
                                    mon_an_da_giao.length;
                                  res.render("nha_hang/danh_sach", {
                                    nguoi_dung: mongooseToObject(nguoi_dung),
                                    nha_hang:
                                      multipleMongooseToObject(nha_hang),
                                    length_nha_hang: length_nha_hang,
                                    xa_kien_giang:
                                      multipleMongooseToObject(xa_kien_giang),
                                    nguoi_dung_quan_li:
                                      multipleMongooseToObject(
                                        nguoi_dung_quan_li
                                      ),
                                    length_don_hang:
                                      length_mon_an_chua_giao +
                                      length_mon_an_da_giao,
                                    mon_an_chua_giao: length_mon_an_chua_giao,
                                    mon_an_da_giao: length_mon_an_da_giao,
                                    message: multipleMongooseToObject(message),
                                  });
                                })
                                .catch(next);
                            })
                            .catch(next);
                        })
                        .catch(next);
                    })
                    .catch(next);
                })
                .catch(next);
            })
            .catch(next);
        })
        .catch(next);
    }
  }

  cap_nhat_nha_hang(req, res, next) {
    NhaHang.findById(req.params._id)
      .then((nha_hang) => {
        XaKienGiang.find({})
          .then((xa_kien_giang) => {
            NguoiDung.findOne({ email: req.cookies.email })
              .then((nguoi_dung) => {
                Message.find({ time: ngayThangNam })
                  .then((message) => {
                    res.render("nha_hang/cap_nhat", {
                      nha_hang: mongooseToObject(nha_hang),
                      xa_kien_giang: multipleMongooseToObject(xa_kien_giang),
                      nguoi_dung: mongooseToObject(nguoi_dung),
                      message: multipleMongooseToObject(message),
                    });
                  })
                  .catch(next);
              })
              .catch(next);
          })
          .catch(next);
      })
      .catch(next);
  }

  chi_tiet_nha_hang(req, res, next) {
    NhaHang.findById(req.params._id)
      .then((nha_hang) => {
        NguoiDung.findOne({ email: req.cookies.email })
          .then((nguoi_dung) => {
            Message.find({ time: ngayThangNam })
              .then((message) => {
                res.render("chi_tiet_nha_hang", {
                  nha_hang: mongooseToObject(nha_hang),
                  nguoi_dung: mongooseToObject(nguoi_dung),
                  message: multipleMongooseToObject(message),
                });
              })
              .catch(next);
          })
          .catch(next);
      })
      .catch(next);
  }

  dat_hang(req, res, next) {
    NhaHang.findById(req.params._id)
      .then((nha_hang) => {
        NguoiDung.findOne({ email: req.cookies.email })
          .then((nguoi_dung) => {
            MonAn.find({})
              .then((mon_an) => {
                Message.find({ time: ngayThangNam })
                  .then((message) => {
                    // message.reverse();
                    res.render("nha_hang/dat_hang", {
                      nha_hang: mongooseToObject(nha_hang),
                      nguoi_dung: mongooseToObject(nguoi_dung),
                      mon_an: multipleMongooseToObject(mon_an),
                      message: multipleMongooseToObject(message),
                    });
                  })
                  .catch(next);
              })
              .catch(next);
          })
          .catch(next);
      })
      .catch(next);
  }
  thuc_don(req, res, next) {
    if (!req.cookies.email || !req.cookies.role) {
      res.redirect("/");
    } else {
      NguoiDung.findOne({ email: req.cookies.email })
        .then((nguoi_dung) => {
          MonAn.find({})
            .then((mon_an) => {
              Message.find({ time: ngayThangNam })
                .then((message) => {
                  res.render("nha_hang/thuc_don", {
                    nguoi_dung: mongooseToObject(nguoi_dung),
                    mon_an: multipleMongooseToObject(mon_an),
                    message: multipleMongooseToObject(message),
                  });
                })
                .catch(next);
            })
            .catch(next);
        })
        .catch(next);
    }
  }

  // Đơn Hàng
  don_hang(req, res, next) {
    DonDatHang.find({})
      .then((don_dat_hang) => {
        MonAn.findById(don_dat_hang.id_mon_an)
          .then((mon_an) => {
            Message.find({ time: ngayThangNam })
              .then((message) => {
                NguoiDung.findOne({})
                  .then((nguoi_dung) => {
                    res.render("nha_hang/don_hang", {
                      don_dat_hang: multipleMongooseToObject(don_dat_hang),
                      mon_an: mongooseToObject(mon_an),
                      message: multipleMongooseToObject(message),
                      nguoi_dung: mongooseToObject(nguoi_dung),
                    });
                  })
                  .catch(next);
              })
              .catch(next);
          })
          .catch(next);
      })
      .catch(next);
  }

  // admin
  admin(req, res, next) {
    // if (req.cookies.email && req.cookies.role === "ADMIN")
    if (req.cookies.email && req.cookies.role !== "") {
      NguoiDung.findOne({ email: req.cookies.email })
        .then((nguoi_dung) => {
          NhaHang.find({})
            .then((nha_hang) => {
              NguoiDung.find({})
                .then((tat_ca_nguoi_dung) => {
                  XaKienGiang.find({})
                    .then((xa_kien_giang) => {
                      Message.find({ time: ngayThangNam })
                        .then((message) => {
                          console.log(message)
                          res.render("admin", {
                            nguoi_dung: mongooseToObject(nguoi_dung),
                            nha_hang: multipleMongooseToObject(nha_hang),
                            tat_ca_nguoi_dung:
                              multipleMongooseToObject(tat_ca_nguoi_dung),
                            xa_kien_giang:
                              multipleMongooseToObject(xa_kien_giang),
                            message: multipleMongooseToObject(message),
                          });
                        })
                        .catch(next);
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
    res.render("accounts/dang_nhap");
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
        res.render("accounts/dang_ky", {
          xa_kien_giang: multipleMongooseToObject(xa_kien_giang),
        });
      })
      .catch(next);
  }

  // khach hang
  khach_hang(req, res, next) {
    if (!req.cookies.email || !req.cookies.role) {
      res.redirect("/");
    } else {
      NguoiDung.findOne({ email: req.cookies.email })
        .then((nguoi_dung) => {
          NguoiDung.find({ role: "Khách Hàng" })
            .then((tat_ca_khach_hang) => {
              XaKienGiang.find({})
                .then((xa_kien_giang) => {
                  Message.find({ time: ngayThangNam })
                    .then((message) => {
                      res.render("nguoi_dung/khach_hang", {
                        nguoi_dung: mongooseToObject(nguoi_dung),
                        tat_ca_khach_hang:
                          multipleMongooseToObject(tat_ca_khach_hang),
                        xa_kien_giang: multipleMongooseToObject(xa_kien_giang),
                        message: multipleMongooseToObject(message),
                      });
                    })
                    .catch(next);
                })
                .catch(next);
            })
            .catch(next);
        })
        .catch(next);
    }
  }

  // quan li
  quan_li(req, res, next) {
    if (!req.cookies.email || !req.cookies.role) {
      res.redirect("/");
    } else {
      NguoiDung.findOne({ email: req.cookies.email })
        .then((nguoi_dung) => {
          NguoiDung.find({ role: "Quản Lý" })
            .then((tat_ca_khach_hang) => {
              XaKienGiang.find({})
                .then((xa_kien_giang) => {
                  Message.find({ time: ngayThangNam })
                    .then((message) => {
                      res.render("nguoi_dung/quan_ly", {
                        nguoi_dung: mongooseToObject(nguoi_dung),
                        tat_ca_khach_hang:
                          multipleMongooseToObject(tat_ca_khach_hang),
                        xa_kien_giang: multipleMongooseToObject(xa_kien_giang),
                        message: multipleMongooseToObject(message),
                      });
                    })
                    .catch(next);
                })
                .catch(next);
            })
            .catch(next);
        })
        .catch(next);
    }
  }

  // quan tri vien
  quan_tri_vien(req, res, next) {
    if (!req.cookies.email || !req.cookies.role) {
      res.redirect("/");
    } else {
      NguoiDung.findOne({ email: req.cookies.email })
        .then((nguoi_dung) => {
          NguoiDung.find({ role: "ADMIN" })
            .then((tat_ca_khach_hang) => {
              XaKienGiang.find({})
                .then((xa_kien_giang) => {
                  Message.find({ time: ngayThangNam })
                    .then((message) => {
                      res.render("nguoi_dung/quan_tri_vien", {
                        nguoi_dung: mongooseToObject(nguoi_dung),
                        tat_ca_khach_hang:
                          multipleMongooseToObject(tat_ca_khach_hang),
                        xa_kien_giang: multipleMongooseToObject(xa_kien_giang),
                        message: multipleMongooseToObject(message),
                      });
                    })
                    .catch(next);
                })
                .catch(next);
            })
            .catch(next);
        })
        .catch(next);
    }
  }

  // ho so
  ho_so(req, res, next) {
    res.render("ho_so");
  }
}

module.exports = new GetController();
