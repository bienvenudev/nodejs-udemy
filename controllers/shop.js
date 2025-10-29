const Product = require("../models/product");

exports.getIndex = (req, res, next) => {
  Product.fetchAll((product) => {
    // console.log("product is,", product);
    res.render("shop/index", {
      pageTitle: "Shop",
      prods: product,
      path: "/",
    });
  });
};

exports.getCart = (req, res, next) => {
  res.render("shop/cart", {
    pageTitle: "Cart",
    path: "/cart",
  });
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((product) => {
    // console.log("product is,", product);
    res.render("shop/product-list", {
      pageTitle: "Products",
      prods: product,
      path: "/products",
    });
  });
};
