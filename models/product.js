const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(require.main.filename),
  "data",
  "products.json"
);

const getProductFromFile = (cb) => {
  fs.readFile(p, (err, data) => {
    if (err) return cb([]);

    // Check if file is empty or whitespace-only
    if (!data || data.toString().trim() === "") {
      return cb([]);
    }

    cb(JSON.parse(data));
  });
};

module.exports = class Product {
  constructor(product) {
    this.title = product.title;
    this.price = product.price;
  }

  save() {
    getProductFromFile((products) => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        if (err) console.log("Error writing to file:", err);
        console.log("File written successfully!");
      });
    });
  }

  static fetchAll(cb) {
    getProductFromFile(cb);
  }
};
