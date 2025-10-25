const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "admin/add-product",
  });
};

exports.postAddProduct = (req, res, next) => {
  const product = new Product({
    title: req.body.title,
    price: req.body.price,
  });

  product.save();

  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((product) => {
    console.log("product is,", product);
    res.render("shop", { pageTitle: "Shop", prods: product, path: "/" });
  });
};
