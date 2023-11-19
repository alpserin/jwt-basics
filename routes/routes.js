const express = require("express");
const router = express.Router();
const { getFunc, postFunc } = require("../controllers/funcs");

router.route("/").get(getFunc).post(postFunc);

module.exports = router;
