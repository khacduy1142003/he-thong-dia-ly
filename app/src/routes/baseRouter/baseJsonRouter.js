const express = require("express");
const router = express.Router();

const baseJsonController = require("../../app/controllers/base/JsonController");

router.get("/json-nha-hang", baseJsonController.json_nha_hang);
router.get("/json-nha-hang/:_id", baseJsonController.json_chi_tiet_nha_hang);

router.get("/json-nguoi-dung", baseJsonController.json_nguoi_dung);

router.get("/json-tat-ca-don-dat-hang", baseJsonController.json_tat_ca_don_dat_hang);
router.get("/json-don-dat-hang/:_id", baseJsonController.json_don_dat_hang);
router.get("/json-khach-hang/:_id", baseJsonController.json_khach_hang);
router.get("/json-mon-an/:_id", baseJsonController.json_mon_an);

module.exports = router;
