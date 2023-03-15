const express = require("express");
const { Artist, Product } = require("../models");
const router = express.Router();
const S = require("sequelize")
const search_controller = require("../controlers/search_controller")


// GET all info about artist by name
// FRONT!! pasar user input bajo query 'input'

router.get("/artworks/:artist", search_controller.find_artworks_by_artist_get );

router.get("/artist", search_controller.find_artist_input_get);

// GET all info about product by name
// FRONT!! pasar user input bajo query 'input'
router.get("/product", search_controller.find_product_by_input_get);

// Find all categories

router.get("/categories", search_controller.find_all_categories_get);

// GET all info about products by category

router.get("/products/:category", search_controller.find_product_by_category);

module.exports = router;
