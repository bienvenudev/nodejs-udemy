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
  const product = new Product(null, title, imageUrl, price, description);
  product
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.error("error writing data in db. Error: ", err);
    });
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteById(prodId)
    .then(() => {
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.error("error deleting product from db. Error: ", err);
      res.status(500).render("admin/products", {
        pageTitle: "Admin Products",
        path: "/admin/products",
        prods: [],
      });
    });
};

exports.getEditProduct = (req, res, next) => {
  const productId = req.params.productId;
  const editMode = req.query.edit;

  if (!editMode) {
    return res.redirect("/");
  }

  Product.findById(productId)
    .then(([rows]) => {
      const product = rows[0];
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product,
      });
    })
    .catch((err) => {
      console.error("error finding product. Error: ", err);
      res.redirect("/");
    });
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDesc = req.body.description;
  const updatedProduct = new Product(
    prodId,
    updatedTitle,
    updatedImageUrl,
    updatedPrice,
    updatedDesc
  );
  updatedProduct.save()
    .then(() => {
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.error("error updating product in db. Error: ", err);
      res.redirect("/admin/products");
    });
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([products]) => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => {
      console.error("error retrieving data in db. Error: ", err);
    });
};

exports.getProductByName = (req, res, next) => {
  const productName = req.params.productName;

  Product.fetchByName(productName)
    .then((data) => {
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        product: data[0],
        path: `/admin/edit-product/${productName}`,
      });
    })
    .catch((err) => {
      console.error("error while fetching by name", err);
      res.redirect("/admin/products");
    });
};
