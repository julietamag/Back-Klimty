const express = require("express");
const { Cart } = require("../models");
const router = express.Router();
const cart_controller = require("../controlers/cart_controller");

// SOLO SE CREAN CARRITOS AL DESPACHAR ORDEN DE COMPRA Y REGISTRO DE USUARIO NUEVO

// Get all carts
// historial => findAll solo carritos con status false

router
    .get("/", cart_controller.find_all_get)

// Get cart by ID
    .get("/:userId", cart_controller.find_by_id_get)
    .post("/:userId/update/:productId", cart_controller.update_cart_post)
    .post("/:userId/create", cart_controller.create_new_cart_post)

module.exports = router;
