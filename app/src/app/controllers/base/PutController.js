const NhaHang = require("../../models/NhaHang");
const NguoiDung = require("../../models/Account");

const {
  multipleMongooseToObject,
  mongooseToObject,
} = require("../../../util/mongoose");

class PutController {
  // nha hang
  nha_hang(req, res, next) {
    let imagesnew = req.body.image;
    if (!imagesnew) {
      NhaHang.findById(req.params._id)
       .then((nhahang) => {
        imagesnew = nhahang.image;  
        NhaHang.findByIdAndUpdate(req.params._id, {
          name: req.body.name,
          email: req.cookies.email,
          image: imagesnew,
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
            // console.log("khong chon anh")
            // console.log(req.body)
            
            res.redirect("back");
          })
          .catch(next); 
        })
    } else {
      NhaHang.findByIdAndUpdate(req.params._id, {
        name: req.body.name,
        email: req.cookies.email,
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
          // console.log("co chon anh")
          // console.log(req.body)
          
          res.redirect("back");
        })
        .catch(next);
    }
  }

  // nguoi dung
  nguoi_dung(req, res, next) {
    NguoiDung.findByIdAndUpdate(req.params._id, {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      address: req.body.address,
      role: req.body.role,
    })
      .then(() => res.redirect("back"))
      .catch(next);
  }
}

module.exports = new PutController();
