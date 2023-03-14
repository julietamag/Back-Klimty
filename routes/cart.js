const express = require("express");
const { Cart, User } = require("../models");
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const router = express.Router();

// SOLO SE CREAN CARRITOS AL DESPACHAR ORDEN DE COMPRA Y REGISTRO DE USUARIO NUEVO

// Get all carts
// historial => findAll solo carritos con status false
router.get("/", (req, res, next) => {
  Cart.findAll()
    .then((carts) => res.send(carts))
    .catch(next);
});

// Get cart by ID ??????????
router.get("/:userId", (req, res, next) => {
  Cart.findOne({ where: { userId: req.params.userId, state: true } })
    .then((cart) => {
      if (!cart) {
        return res.status(404).send({ message: "Cart not found" });
      }
      res.send(cart);
    })
    .catch(next);
});

router.post("/:userId/update/:productId", (req, res, next) => {
  const { userId, productId } = req.params;
  Cart.findOrCreate({
    where: { userId, state: true },
  })
    .then((cart) => {
      const cartId = cart[0].dataValues.id;

      Cart.update(req.body, { where: { id: cartId }, returning: true }).then(
        (response) => res.status(200).send(response)
      );
    })
    .catch(next);
});

router.post("/:userId/create", (req, res, next) => {
  const { userId } = req.params;

  Cart.findOrCreate({
    where: { userId, state: true },
  }).catch(next);
});


module.exports = router;
