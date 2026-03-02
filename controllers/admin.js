const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  req.user
    .createProduct({
      title,
      price,
      imageUrl,
      description,
    })
    .then((result) => {
      console.log("Posted Product!");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.error(err);
    });
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;

  Product.destroy({ where: { id: prodId } })
    .then((result) => {
      console.log("Deleted product:", result);
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.error("Error deleting product:", err);
    });
};

exports.getEditProduct = (req, res, next) => {
  const prodId = req.params.productId;
  const editMode = req.query.edit;

  if (!editMode) {
    return res.redirect("/");
  }

  // Product.findByPk(prodId)
  req.user
    .getProducts({ where: { id: prodId } })
    .then((products) => {
      const product = products[0];
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product,
      });
    })
    .catch((err) => {
      console.error("error retrieving product. Error:", err);
    });
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = parseFloat(req.body.price);
  const updatedDesc = req.body.description;

  Product.findByPk(prodId)
    .then((product) => {
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.imageUrl = updatedImageUrl;
      product.description = updatedDesc;

      return product.save();
    })
    .then((result) => {
      console.log("Updated product!");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.error("Error finding by PK. Error:", err);
    });

  // Product.update(
  //   {
  //     title: updatedTitle,
  //     price: updatedPrice,
  //     imageUrl: updatedImageUrl,
  //     description: updatedDesc,
  //   },
  //   { where: { id: prodId } }
  // )
  //   .then((result) => {
  //     console.log("Number of rows updated:", result[0]);
  //     res.redirect("/admin/products");
  //   })
  //   .catch((err) => {
  //     console.error("Error updating product:", err);
  //   });
};

exports.getProducts = (req, res, next) => {
  // Product.findAll()
  req.user
    .getProducts()
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => {
      console.error("error retrieving all products. Error: ", err);
    });
};
