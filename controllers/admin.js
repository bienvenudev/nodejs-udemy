const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
  });
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((product) => {
    // console.log("product is,", product);
    res.render("admin/products", {
      pageTitle: "Admin Products",
      prods: product,
      path: "/admin/products",
    });
  });
};

exports.getProductByName = (req, res, next) => {
  const productName = req.params.productName;

  Product.fetchByName(productName)
    .then((data) => {
      console.log("here in getProductByName the data = ", data[0]);
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        product: data[0],
        path: `/admin/edit-product/${productName}`,
      });
    })
    .catch((err) => console.log("error while fetching by name", err));
};

exports.postAddProduct = (req, res, next) => {
  const product = new Product({
    title: req.body.title,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    description: req.body.description,
  });

  product.save();

  res.redirect("/products");
};

exports.getDeleteProduct = (req, res, next) => {
  const productName = req.params.productName;

  
}