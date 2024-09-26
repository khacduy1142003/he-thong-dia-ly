const express = require("express");
const router = express.Router();

const baseJsonController = require("../../app/controllers/base/JsonController");

router.get('/json-nha-hang', baseJsonController.json_nha_hang);
router.get('/json-nguoi-dung', baseJsonController.json_nguoi_dung);


module.exports = router;
