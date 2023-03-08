const express = require("express");
const { Cart, User, Product } = require("../models");
const router = express.Router();

// get user by id con include Cart ya me trae todos los carritos asociados a ese usario.
// modificar el carrito con estado true
// agregar el id del producto apsado por params
// eliminar el id del producot pasado por params
// editar la cantidad de determiando producto

// Get all carts
// historial => findAll solo carritos con status false
router.get("/", (req, res, next) => {
  Cart.findAll()
    .then((carts) => res.send(carts))
    .catch(next);
  //  console.error(error);
  // res.status(500).json({ message: "Server Error" });
});

// Get cart by ID
router.get("/:id", (req, res, next) => {
  Cart.findByPk(req.params.id)
    .then((cart) => {
      if (!cart) {
        return res.status(404).send({ message: "Cart not found" });
      }
      res.send(cart);
    })
    .catch(next);
});

// Create a new cart
//FRONT!! mandar TRUE como STATE en req body!!!
router.post("/", (req, res, next) => {
  Cart.create(req.body)
    .then((cart) => res.status(201).send(cart))
    .catch(next);
});

// Update cart by ID
router.put("/:id", (req, res, next) => {
  Cart.findByPk(req.params.id)
    .then((cart) => {
      if (!cart) {
        return res.status(404).send({ message: "Cart not found" });
      }
      cart.update(req.body);
    })
    .catch(next);
});

// Add product to cart
//FRONT!! mandar dentro de la ruta el ID del USER y el ID del PRODUCT a agregar

router.post("/:userId/add/:productId", (req, res, next) => {
  const { userId, productId } = req.params;
  let user;
  let product;
  let cart;
  User.findByPk(userId).then((user) => {
    user = user;
  });
  Product.findByPk(productId).then((product) => {
    product = product;
  });

  if (!user || !product) {
    res.status(404).send("User or product not found");
  }

  Cart.findOne({
    where: { userId, state: true },
  })
    .then((cart) => {
      if (!cart) {
        Cart.create({
          state: true,
          userId,
          products: [{ productId, quantity: 1 }],
        });
      } else {
        const productIndex = cart.products.findIndex(
          (item) => item.productId === productId
        );

        if (productIndex === -1) {
          cart.products.push({ productId, quantity: 1 });
        } else {
          cart.products[productIndex].quantity++;
        }
      }
      res.send(cart);
    })
    .catch(next);
});

// Delete product by ID from cart
//FRONT!! mandar dentro de la ruta el ID del USER y el ID del PRODUCT a eliminar
router.post("/:userId/delete/:productId", (req, res, next) => {
  const { userId, productId } = req.params;
  let user;
  let product;
  let cart;
  User.findByPk(userId).then((user) => {
    user = user;
  });
  Product.findByPk(productId).then((product) => {
    product = product;
  });

  if (!user || !product) {
    res.status(404).send("User or product not found");
  }

  Cart.findOne({
    where: { userId, state: true },
  })
    .then((cart) => {
      const productIndex = cart.products.findIndex(
        (item) => item.productId === productId
      );

      if (cart.products[productIndex].quantity === 1) {
        cart.products.filter((product) => {
          product !== cart.products[productIndex];
        });
      } else {
        cart.products[productIndex].quantity--;
      }

      res.send(cart);
    })
    .catch(next);
});

// NUEVO 

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
