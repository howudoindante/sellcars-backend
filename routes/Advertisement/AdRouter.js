var express = require('express');
var router = express.Router();
const accessChecker = require("../../middleware/accessChecker");
const {createAdvert, getAdvertByQuery, getAdvertById} = require("./AdController");

router.post("/",accessChecker("user"),createAdvert);
router.get("/",getAdvertByQuery);
router.get("/:id",getAdvertById);
module.exports = router;