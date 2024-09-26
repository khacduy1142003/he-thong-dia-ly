const NhaHang = require("../../models/NhaHang");
const NguoiDung = require("../../models/Account");

const diacritics = require("diacritics");

const {
  multipleMongooseToObject,
  mongooseToObject,
} = require("../../../util/mongoose");

class PostController {
  // nha hang
  nha_hang(req, res, next) {
    NhaHang.create({
      name: req.body.name,
      image: req.body.image,
      index: {
        vido: req.body.vido,
        kinhdo: req.body.kinhdo,
      },
      address: req.body.address,
      time: req.body.time,
      about: req.body.about,
      travel: req.body.travel,
    })
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
    })
      .then(() => {
        res.redirect("back");
      })
      .catch(next);
  }

  //  đăng nhập
  dang_nhap(req, res, next) {
    const { email, password } = req.body;

    NguoiDung.findOne({ email: email })
      .then((account) => {
        if (!account) {
          // Nếu không tìm thấy tài khoản với email đó
          return res.redirect("/dang-nhap");
        }

        // Kiểm tra mật khẩu (nếu bạn sử dụng mã hóa bcrypt, dùng bcrypt.compare)
        if (account.password === password) {
          // Xóa tất cả cookie cũ
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
            return res.redirect("/");
          }
        } else {
          return res.redirect("/dang-nhap");
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
        next(error); // Xử lý lỗi
      });
  }

  // dang ky
  dang_ky(req, res, next) {
    NguoiDung.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      address: req.body.address,
      role: "ngưòi dùng",
    })
      .then(() => {
        res.redirect("dang-nhap");
      })
      .catch(next);
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
}

module.exports = new PostController();
