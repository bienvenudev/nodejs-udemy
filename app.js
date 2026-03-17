require("dotenv").config();

const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const mongoConnect = require("./util/database").mongoConnect;

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// app.use((req, res, next) => {
//   User.findByPk(1)
//     .then((user) => {
//       req.user = user;
//       next();
//     })
//     .catch((err) => {
//       console.error("error while getting user:", err);
//     });
// });

app.use("/admin", adminRoutes);
app.use(shopRoutes);

mongoConnect(() => {
  app.listen(3000, () => {
    console.log(`server listening on http://localhost:${process.env.PORT}`);
  })
})