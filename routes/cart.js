const express = require("express");
const { Cart, User } = require("../models");
const router = express.Router();

// SOLO SE CREAN CARRITOS AL DESPACHAR ORDEN DE COMPRA Y REGISTRO DE USUARIO NUEVO

// Get all carts
// historial => findAll solo carritos con status false
router.get("/", async (req, res, next) => {
  try {
    const allCarts = await Cart.findAll()
    return res.status(200).send(allCarts)
  } catch (err) {
    return next(err)
  }
});

// Get cart by ID ??????????
router.get("/:userId", async (req, res, next) => {
  try {
    const foundCart = await Cart.findOne({ where: { userId: req.params.userId, state: true } })
    return res.status(200).send(foundCart)
  } catch (err) {
    return next(err)
  }
});

router.post("/:userId/update/:productId", async (req, res, next) => {
  try {
    const foundCartOrCreated = await Cart.findOrCreate({ where: { userId: req.params.userId, state: true } })
    const cartId = foundCartOrCreated[0].dataValues.id;
    const updatedCart = await Cart.update(req.body, { where: { id: cartId }, returning: true })
    res.status(200).send(updatedCart)
  } catch (err) {
    return next(err)
  }
});

router.post("/:userId/create", async (req, res, next) => {
  try {
    const CreateCart = await Cart.findOrCreate({ where: { userId: req.params.userId, state: true } })
    return res.status(201).send(CreateCart)
  } catch (err) {
   return next(err)
  }
});


module.exports = router;
