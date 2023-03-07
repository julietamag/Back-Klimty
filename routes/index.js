const express = require("express");
const router = express.Router();
const user = require("./user");
const product = require("./product");
const artist = require("./artist");
const cart = require("./cart");

router.use("/user", user);
router.use("/product", product);
router.use("/artist", artist);
router.use("/cart", cart);


module.exports = router;