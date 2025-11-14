const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([products]) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch((err) => {
      console.error("error retrieving data in db. Error: ", err);
      res.status(500).render("shop/product-list", {
        prods: [],
        pageTitle: "All Products",
        path: "/products",
      });
    });
};

exports.getProduct = (req, res, next) => {
  const productId = req.params.productId;

  Product.findById(productId)
    .then(([rows]) => {
      const product = rows[0];
      if (!product) {
        return res.redirect("/");
      }
      res.render("shop/product-detail", {
        product: product,
        pageTitle: product.title,
        path: "/products",
      });
    })
    .catch((err) => {
      console.error("error while finding by id. Error: ", err);
      res.redirect("/");
    });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(([products]) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => {
      console.error("error retrieving data in db. Error: ", err);
      res.status(500).render("shop/index", {
        prods: [],
        pageTitle: "Shop",
        path: "/",
      });
    });
};

exports.getCart = (req, res, next) => {
  Cart.getCart((cart) => {
    Product.fetchAll();
    // Product.fetchAll((products) => {
    //   const cartProducts = [];
    //   for (let product of products) {
    //     const cartProductData = cart.products.find(
    //       (prod) => prod.id === product.id
    //     );

    //     if (cartProductData) {
    //       cartProducts.push({ productData: product, qty: cartProductData.qty });
    //     }
    //   }

    //   res.render("shop/cart", {
    //     pageTitle: "Your Cart",
    //     products: cartProducts,
    //     path: "/cart",
    //   });
    // });
  });
};

exports.postCart = (req, res, next) => {
  const productId = req.body.productId;

  Product.findById(productId)
    .then(([rows]) => {
      const product = rows[0];
      if (product) {
        Cart.addProduct(productId, product.price);
      }
      res.redirect("/cart");
    })
    .catch((err) => {
      console.error("error finding product for cart. Error: ", err);
      res.redirect("/cart");
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  
  Product.findById(productId)
    .then(([rows]) => {
      const product = rows[0];
      if (product) {
        Cart.deleteProduct(productId, product.price);
      }
      res.redirect("/cart");
    })
    .catch((err) => {
      console.error("error finding product for deletion. Error: ", err);
      res.redirect("/cart");
    });
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    pageTitle: "Your Orders",
    path: "/orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    pageTitle: "Checkout",
    path: "/checkout",
  });
};
