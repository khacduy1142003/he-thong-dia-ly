const NhaHang = require("../../models/Nha_Hang/Nha_Cung_Cap");
const NguoiDung = require("../../models/Account");
const MonAn = require("../../models/Nha_Hang/Mon_An");
const DonDatHang = require("../../models/Nha_Hang/Don_Dat_Hang");

class PutController {
  // nha hang
  nha_hang(req, res, next) {
    let imagesnew = req.body.anh;
    if (!imagesnew) {
      NhaHang.findById(req.params._id).then((nhahang) => {
        imagesnew = nhahang.image;
        NhaHang.findByIdAndUpdate(req.params._id, {
          ten: req.body.ten,
          email: req.body.email,
          anh: imagesnew,
          vi_do: req.body.vi_do,
          kinh_do: req.body.kinh_do,
          dia_chi: req.body.dia_chi,
          so_dien_thoai: req.body.so_dien_thoai,
        })
          .then((data) => {
            // console.log("khong chon anh")
            // console.log(req.body)
            // console.log(data)

            res.redirect("back");
          })
          .catch(next);
      });
    } else {
      NhaHang.findByIdAndUpdate(req.params._id, {
        ten: req.body.ten,
        email: req.body.email,
        anh: imagesnew,
        vi_do: req.body.vi_do,
        kinh_do: req.body.kinh_do,
        dia_chi: req.body.dia_chi,
        so_dien_thoai: req.body.so_dien_thoai,
      })
        .then((data) => {
          // console.log(data)
          res.redirect("back");
        })
        .catch(next);
    }
  }

  // nguoi dung
  nguoi_dung(req, res, next) {
    let avatarnew = req.body.avatar;
    if (!avatarnew) {
      NguoiDung.findById(req.params._id)
        .then((nguoi_dung_id) => {
          NguoiDung.findByIdAndUpdate(req.params._id, {
            fullname: req.body.fullname,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password,
            address: req.body.address,
            avatar: nguoi_dung_id.avatar,
          })
            .then(() => res.redirect("back"))
            .catch(next);
        })
        .catch(next);
    } else {
      NguoiDung.findByIdAndUpdate(req.params._id, {
        fullname: req.body.fullname,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        address: req.body.address,
        avatar: req.body.avatar,
      })
        .then(() => res.redirect("back"))
        .catch(next);
    }
  }

  // Món Ăn
  mon_an(req, res, next) {
    let avatarnew = req.body.anh;
    if (!avatarnew) {
      MonAn.findById(req.params._id)
        .then((nguoi_dung_id) => {
          MonAn.findByIdAndUpdate(req.params._id, {
            ten: req.body.ten,
            gia: req.body.gia,
            mo_ta: req.body.mo_ta,
            anh: nguoi_dung_id.anh,
          })
            .then(() => res.redirect("back"))
            .catch(next);
        })
        .catch(next);
    } else {
      MonAn.findByIdAndUpdate(req.params._id, req.body)
        .then(() => res.redirect("back"))
        .catch(next);
    }
    
  }

  // Đơn đặt Hàng
  don_dat_hang(req, res, next) {
    DonDatHang.findByIdAndUpdate(req.params._id, {
      trang_thai: req.body.trang_thai,
    })
     .then(() => res.redirect("back"))
     .catch(next);
  }
}

module.exports = new PutController();
