const express = require("express");
const router = express.Router();

const baseGetController = require("../../app/controllers/base/GetController");

// router.get("/nha-hang", baseGetController.nha_hang);
router.get("/admin", baseGetController.admin);
router.get("/dang-ky", baseGetController.dang_ky);
router.get("/", baseGetController.dang_nhap);

// nguoi dung
router.get("/khach-hang", baseGetController.khach_hang);
router.get("/quan-ly", baseGetController.quan_li);
router.get("/quan-tri-vien", baseGetController.quan_tri_vien);

// nha hang
router.get("/nha-hang", baseGetController.danh_sach_nha_hang);
router.get("/nha-hang/cap-nhat/:_id", baseGetController.cap_nhat_nha_hang);
router.get("/thuc-don", baseGetController.thuc_don);
router.get("/don-hang", baseGetController.don_hang);

// slug
router.get("/nha-hang/:_id", baseGetController.chi_tiet_nha_hang);
router.get("/dat-hang/:_id", baseGetController.dat_hang);

// ho so
router.get("/ho-so/:_id", baseGetController.ho_so);

// slug
router.get("/nguoi-dung/:_id", baseGetController.chi_tiet_nguoi_dung);

module.exports = router;
