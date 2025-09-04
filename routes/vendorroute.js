const express = require("express");

const router = express.Router();

const vendor = require("../Models/Vendor");

const vendorController = require("../Controllers/vendorcontroller");

router.post("/register", vendorController.vendorregister);

router.post("/login", vendorController.vendorlogin);

router.get("/getallvendors", vendorController.getallvendors);
router.get("/single-vendor/:id", vendorController.getsinglevendor);

module.exports = router;
