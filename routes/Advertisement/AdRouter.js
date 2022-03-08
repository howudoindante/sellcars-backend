var express = require('express');
var router = express.Router();
const accessChecker = require("../../middleware/accessChecker");
const isOwnerChecker = require("../../middleware/isOwnerChecker");
const {createAdvert, getAdvertByQuery, getAdvertById, updateAdvertById, removeAdvertById} = require("./AdController");

router.post("/",accessChecker("user"),createAdvert);
router.get("/",getAdvertByQuery);
router.get("/:id",getAdvertById);
router.put("/:id",isOwnerChecker,updateAdvertById);
router.delete("/:id",isOwnerChecker,removeAdvertById);
module.exports = router;