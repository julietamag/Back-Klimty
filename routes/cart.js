const express = require("express");
const { Cart, User, Product } = require("../models");

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
  })
  .catch(next);
});

// IGNORAR =>

// router.post("/:cartId/:productId", (req, res) => {
//   const id = req.params.cartId;
//   const productId = req.params.productId;
//   Product.findByPk(productId)
//     .then((item) => {
//       let transporter = nodemailer.createTransport({
//         host: "smtp.ethereal.email",
//         port: 587,
//         secure: false,
//         auth: {
//           user: "Klimty Ecommerce",
//           pass: "Klimty1234",
//         },
//       });

//       const message = {
//         from: "klimtyecommerce@gmail.com",
//         to: item.email,
//         subject: `Your purchased of ${item.name}, has been confirmed.`,
//         text: "Don't really have much to say",
//       };

//       transporter.sendMail(message, function (err, data) {
//         if (err) {
//           res.status(400).send({ error: "failed to send the email" });
//         } else {
//           Cart.products
//             .findByPk(productId)
//             .then((item) => {
//               item.destroy().then((data) => res.status(200).send(data));
//             })
//             .catch(() =>
//               res
//                 .status(400)
//                 .send({ error: "failed to delete the purchased product" })
//             );
//           res.status(200).send(data);
//         }
//       });
//     })
//     .catch(() => res.status(400).send({ error: "failed to send the email" }));
// });

module.exports = router;
