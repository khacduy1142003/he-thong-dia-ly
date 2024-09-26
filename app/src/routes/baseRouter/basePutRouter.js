const express = require("express");
const router = express.Router();

const basePutController = require("../../app/controllers/base/PutController");

router.put('/nha-hang/:_id', basePutController.nha_hang);
router.put('/nguoi-dung/:_id', basePutController.nguoi_dung);

module.exports = router;
