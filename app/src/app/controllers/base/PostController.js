const NhaHang = require("../../models/Nha_Hang/Nha_Cung_Cap");
const NguoiDung = require("../../models/Account");
const MonAn = require("../../models/Nha_Hang/Mon_An");
const DonDatHang = require("../../models/Nha_Hang/Don_Dat_Hang");
const Message = require("../../models/message");

const diacritics = require("diacritics");

const ngayDatHang = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
const ngayThangNam = new Date().toLocaleDateString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
const gioPhutGiay = new Date().toLocaleTimeString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });

const {
  multipleMongooseToObject,
  mongooseToObject,
} = require("../../../util/mongoose");
const Nha_Cung_Cap = require("../../models/Nha_Hang/Nha_Cung_Cap");
const Account = require("../../models/Account");

class PostController {
  // nha hang
  nha_hang(req, res, next) {
    NhaHang.create(req.body)
      .then(() => {
        // console.log(req.body);
        res.redirect("back");
      })
      .catch(next);
  }

  // nguoi dung
  nguoi_dung(req, res, next) {
    NguoiDung.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      address: req.body.address,
      role: req.body.role,
      phone: req.body.phone,
      avatar: req.body.avatar,
      fullname: req.body.fullname,
      status: req.body.status,
    }),
    Message.create({
      image: req.body.avatar,
      content: `Người dùng ${req.body.username} đã tạo tài khoản lúc ${gioPhutGiay}`,
      title: req.body.username,
      time: ngayThangNam,
    })
      .then(() => {
        res.redirect("back");
      })
      .catch(next);
  }

  // Món ăn
  mon_an(req, res, next) {
    MonAn.create(req.body)
     .then(() => {
        res.redirect("back");
      })
     .catch(next);
  }

  // Đơn Đặt Hàng
  don_dat_hang(req, res, next) {
    NguoiDung.findOne({email: req.cookies.email})
    .then(data => {
      NhaHang.findById(req.params._id)
      .then(nha_hang => {
        DonDatHang.create({
          id_khach_hang: data._id,
          id_nha_hang: req.params._id,
          id_mon_an: req.body.id_mon_an,
          ten_khach_hang: data.username,
          mon_an: req.body.mon_an,
          ten_nha_hang: nha_hang.ten,
          anh: req.body.anh,
          gia: req.body.gia,
          trang_thai: req.body.trang_thai,
          ngay_dat_hang:ngayDatHang,
        }),
        Message.create({
          image: data.avatar,
          content: `${data.username} đã đặt món ${req.body.mon_an} tại nhà hàng ${nha_hang.ten} vào ${gioPhutGiay}`,
          title: data.username,
          time: ngayThangNam,
        })
       .then((_) => {
        res.redirect("back");
       })
       .catch(next);
      })
      .catch(next);
    })
    .catch(next);
  }

  //  đăng nhập
  dang_nhap(req, res, next) {
    const { email, password } = req.body;

    NguoiDung.findOne({ email: email })
      .then((account) => {
        if (!account) {
          return res.redirect("/");
        }

        if (account.password === password) {
          for (let cookie in req.cookies) {
            res.clearCookie(cookie);
          }
          // Lưu email vào cookie
          res.cookie("email", account.email);
          res.cookie("role", account.role);

          // Kiểm tra vai trò (role)
          console.log(account.role);
          if (account.role === "ADMIN") {
            return res.redirect("/admin");
          } else {
            return res.redirect("/admin");
          }
        } else {
          return res.redirect("/admin");
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
        next(error); 
      });
  }

  // dang ky
  dang_ky(req, res, next) {
    if (req.body.role ==="Khách Hàng") {
      NguoiDung.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address,
        role: req.body.role,
        phone: req.body.phone,
        avatar: "user.png",
        fullname: req.body.fullname,
        status: 1,
      })
        .then(() => {
          // console.log(req.body);
          res.redirect("/dang-nhap");
        })
        .catch(next);
    } else {
      NguoiDung.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address,
        role: req.body.role,
        phone: req.body.phone,
        avatar: "user.png",
        fullname: req.body.fullname,
        status: 0,
      }),
      Message.create({
        image: req.body.avatar,
        content: `Người dùng ${req.body.username} đã tạo tài khoản thành công lúc ${gioPhutGiay}`,
        title: req.body.username,
        time: ngayThangNam,
      })
        .then(() => {
          // console.log(req.body);
          res.redirect("/dang-nhap");
        })
        .catch(next);
    }
  }

  // index
  index(req, res, next) {
    // console.log(req.body);
    const travelNormalized = diacritics.remove(req.body.travel).toUpperCase();

    console.log(travelNormalized);
    if (travelNormalized.trim() === "NHA HANG") {
      res.redirect("/nha-hang");
    } else if (travelNormalized.trim() === "KHACH SAN") {
      res.redirect("/khach-san");
    } else {
      res.redirect("/");
    }
  }

  // Orders
  orders(req, res, next) {
    
  }
}

module.exports = new PostController();
