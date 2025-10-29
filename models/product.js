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

    try {
      cb(JSON.parse(data));
      // console.log("data is", data.toString());
    } catch (err) {
      console.log("Error parsing JSON:", err);
      cb([]);
    }
  });
};

module.exports = class Product {
  constructor(product) {
    this.title = product.title;
    this.imageUrl = product.imageUrl;
    this.price = product.price;
    this.description = product.description;
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

  static fetchByName(productName) {
    const myPromise = new Promise((resolve, reject) => {
      getProductFromFile((product) => {
        const result = product.filter((prod) => prod.title === productName);
        resolve(result);
      });
    });
    return myPromise;
  }
};
