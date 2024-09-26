const express = require("express");
const router = express.Router();

const baseGetController = require("../../app/controllers/base/GetController");

router.get("/nha-hang", baseGetController.nha_hang);
router.get("/admin", baseGetController.admin);
router.get("/dang-ky", baseGetController.dang_ky);
router.get("/dang-nhap", baseGetController.dang_nhap);

router.get("/", baseGetController.index);

// slug
router.get("/nha-hang/:_id", baseGetController.chi_tiet_nha_hang);
router.get("/nguoi-dung/:_id", baseGetController.chi_tiet_nguoi_dung);

module.exports = router;
