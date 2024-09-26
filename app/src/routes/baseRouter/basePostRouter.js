const express = require("express");
const router = express.Router();

const basePostController = require("../../app/controllers/base/PostController");

router.post("/nha-hang", basePostController.nha_hang);
router.post("/nguoi-dung", basePostController.nguoi_dung);
router.post("/dang-ky", basePostController.dang_ky);
router.post("/dang-nhap", basePostController.dang_nhap);
router.post("/", basePostController.index);

module.exports = router;
