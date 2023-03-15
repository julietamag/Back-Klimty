const express = require("express");
const router = express.Router();
const user = require("./user");
const product = require("./product");
const artist = require("./artist");
const cart = require("./cart");
const search = require("./search");
const checkout = require("./checkout");
const review = require("./review");

router.use("/user", user);
router.use("/product", product);
router.use("/artist", artist);
router.use("/cart", cart);
router.use("/search", search);
router.use("/checkout", checkout);
router.use("/review", review);

module.exports = router;
