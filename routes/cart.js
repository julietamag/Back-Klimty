const express = require("express");
const { Cart, Product } = require("../models");
const nodemailer = require("nodemailer");
const router = express.Router();

router.get("/:id", (req, res) => {
  const id = req.params.id;
  Cart.findByPk(id)
    .then((cart) => {
      res.status(200).send(cart);
    })
    .catch(() =>
      res.status(200).send({ error: "the cart couldn't be loaded" })
    );
});

router.post("/:cartId/:productId", (req, res) => {
  const id = req.params.cartId;
  const productId = req.params.productId;
  Product.findByPk(productId)
    .then((item) => {
      let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: "Klimty Ecommerce",
          pass: "Klimty1234",
        },
      });

      const message = {
        from: "klimtyecommerce@gmail.com",
        to: item.email,
        subject: `Your purchased of ${item.name}, has been confirmed.`,
        text: "Don't really have much to say",
      };

      transporter.sendMail(message, function (err, data) {
        if (err) {
          res.status(400).send({error: "failed to send the email"});
        } else {
          Cart.products.findByPk(productId).then((item) => {
            item.destroy().then((data) => res.status(200).send(data));
          }).catch(() => res.status(400).send({error: "failed to delete the purchased product"}))
          res.status(200).send(data);
        }
      });
    })
    .catch(() => res.status(400).send({ error: "failed to send the email" }));
});

module.exports = router;
