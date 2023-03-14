const express = require("express");
const { Cart, User, Product } = require("../models");
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

// CHECKOUT
router.post("/:userId/checkout", async (req, res, next) => {
  const userId = req.params.userId;
  const cart = await Cart.findOne({ where: { userId, state: true } });
  const totalCart = cart.products;

  const oldCart = await cart.update({ state: false });
  const newCart = await Cart.create({ userId: req.params.userId, state: true });

  res.status(201).send(newCart);

  let transport = nodemailer.createTransport(
    smtpTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: "klimtyecommerce@gmail.com",
        pass: "auaboiqezvqpvulg",
      },
    })
  );

  User.findByPk(userId).then((user) => {
    const { name, lastName, email } = user;

    const message = {
      from: "klimtyecommerce@gmail.com",
      to: email,
      subject: `This is your Klimty order ⚡️`,
      html: `<h2>Hi ${name} ${lastName}!</h2> 
      <h3>This is your purchase:</h3> 
              <br></br>
              <ul>
      ${totalCart.map(
        (item) => `  <div class="card">
      <h4>${item.product.name}</h4>
      <p class="price">Price: $ ${item.product.price}</p>
      <p>Quantity: ${item.quantity}</p>
    </div>`
      )}
      </ul>
      <h5>Thanks for buying in Klimty</h5> 
      `,
    };
    transport.sendMail(message, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Message sent: ", data.messageId);
      }
    });
  });

  /*       
        const address2 = localStorage.getItem("address2");
        const name = localStorage.getItem("name");
        const lastName = localStorage.getItem("lastName");
        const address1 = localStorage.getItem("address1");
       */
  /* 
      localStorage.removeItem("address2");
      localStorage.removeItem("name");
    localStorage.removeItem("lastName");
    localStorage.removeItem("address1"); */
});

router.get("/:userId/history", (req, res, next) => {
  const userId = req.params.userId;
  Cart.findAll({ where: { userId, state: false } }).then((pastCarts) => {
    const carts = pastCarts;
    const exProducts = pastCarts.map((item) => item.products);
    res.status(200).send(exProducts);
  });
});

module.exports = router;
