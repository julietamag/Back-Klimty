const express = require("express");
const { Review, User } = require("../models");
const review_controller = require("../controlers/review_controller")
const router = express.Router();

router.post("/:userId/:productId", review_controller.create_review_post);

router.get("/user/:userId", review_controller.find_user_reviews_get);


router.get("/product/:productId", review_controller.find_reviews_of_product_get);


module.exports = router;
