const express = require("express");
const { Cart } = require("../models");
const router = express.Router();

// SOLO SE CREAN CARRITOS AL DESPACHAR ORDEN DE COMPRA Y REGISTRO DE USUARIO NUEVO

// Get all carts
// historial => findAll solo carritos con status false
router.get("/", async (req, res, next) => {
  try {
    const allCarts = await Cart.findAll()
    res.send(allCarts)
      

  } catch {
    res.send({message: 'Error finding all carts'})
  }
});

// Get cart by ID 
router.get("/:userId", async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: { userId: req.params.userId, state: true },
    });

    if (!cart) {
      return res.status(404).send({ message: "Cart not found" });
    }
    res.send(cart);
  } catch (error) {
    res.send({ message: "Error creating new Cart" });
  }
});

router.post("/:userId/update/:productId", async (req, res, next) => {
  const { userId, productId } = req.params;
  try {
    const cart = await Cart.findOrCreate({
      where: { userId, state: true },
    });
    const cartId = cart[0].dataValues.id;
    const response = await Cart.update(req.body, {
      where: { id: cartId },
      returning: true,
    });
    res.status(200).send(response);
  } catch (error) {
    res.send({ message: "Error creating new Cart" });
  }
});

router.post("/:userId/create", async (req, res, next) => {
  const { userId } = req.params;
  try {
    const cart = await Cart.findOrCreate({
      where: { userId, state: true },
    });
    res.status(201).send(cart);
  } catch (error) {
    res.send({ message: "Error creating new Cart" });
  }
});

module.exports = router;
