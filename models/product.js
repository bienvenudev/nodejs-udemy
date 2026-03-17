const getDb = require("../util/database").getDb;
const ObjectId = require("mongodb").ObjectId;

class Product {
  constructor(title, price, imageUrl, description) {
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
  }

  save() {
    const db = getDb();
    return db
      .collection("products")
      .insertOne(this)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => console.log(err));
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection("products")
      .find()
      .toArray()
      .then((products) => {
        return products;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static findById(productId) {
    const db = getDb();
    return db
      .collection("products")
      .find({ _id: new ObjectId(productId) })
      .next()
      .then((product) => {
        console.log("single product", product);
        return product;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static deleteOne(productId) {
    const db = getDb();

    return db
      .collection("products")
      .deleteOne({ _id: new ObjectId(productId) })
      .then((deleted) => {
        console.log("the deleted count is", deleted);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = Product;
