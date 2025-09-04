const express = require("express");

const router = express.Router();

const firmController = require("../Controllers/firmcontroller");
const verfiytoken = require("../middleware/verifytoken");

router.post("/addfirm", verfiytoken, firmController.addfirm);

router.get("/uploads/:imaagename", (req, res) => {
  const imageName = req.params.imaagename;
  res.headersSent("Content-Type", "image/png");
  res.sendFile(__dirname + ".." + imageName);
});
router.delete("/deletefirm/:id", firmController.deletefirm);
module.exports = router;
