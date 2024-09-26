const express = require("express");
const router = express.Router();

const baseDeleteController = require("../../app/controllers/base/DeleteController");

router.delete('/nha-hang/:_id', baseDeleteController.nha_hang);
router.delete('nguoi-dung/_id', baseDeleteController.nguoi_dung);

module.exports = router;
