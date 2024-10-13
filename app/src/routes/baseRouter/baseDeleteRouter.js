const express = require("express");
const router = express.Router();

const baseDeleteController = require("../../app/controllers/base/DeleteController");

router.delete('/nha-hang/:_id', baseDeleteController.nha_hang);
router.delete('/nguoi-dung/:_id', baseDeleteController.nguoi_dung);
router.delete('/mon-an/:_id', baseDeleteController.mon_an);
router.delete('/don-dat-hang/:_id', baseDeleteController.don_dat_hang);

module.exports = router;
