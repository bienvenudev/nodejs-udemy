const path = require("path");

const express = require("express");

const adminController = require("../controllers/admin");

const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", adminController.getAddProduct);
router.get("/products", adminController.getProducts);
router.get("/edit-product/:productName", adminController.getProductByName);
router.get("/admin/delete-product/:productName", adminController.getDeleteProduct)

// /admin/add-product => POST
router.post("/add-product", adminController.postAddProduct);

module.exports = router;
