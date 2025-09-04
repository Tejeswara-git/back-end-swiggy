const express = require("express");

const router = express.Router();

const productController = require("../Controllers/productcontoller");

router.post("/addproduct/:id", productController.addproduts);

router.get("/:firmid/products", productController.getproductsbyfrim);

router.get("/uploads/:imaagename", (req, res) => {
  const imageName = req.params.imaagename;
  res.headersSent("Content-Type", "image/png");
  res.sendFile(__dirname + ".." + imageName);
});
router.delete("/deleteproduct/:id", productController.deleteproduct);

module.exports = router;
