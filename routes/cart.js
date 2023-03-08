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
router.post("/:userId", (req, res, next) => {
  Cart.create({ userId: req.params.userId, state: true })
    .then((cart) => res.status(201).send(cart))
    .catch(next);
});

// Add product to cart
//FRONT!! mandar dentro de la ruta el ID del USER y el ID del PRODUCT a agregar

router.post("/:userId/add/:productId", (req, res, next) => {
  const { userId, productId } = req.params;

  User.findByPk(userId).then((user) => {
    if (!user) res.status(404).send("User not found");
  });
  Product.findByPk(productId).then((product) => {
    if (!product) res.status(404).send("User not found");
  });

  Cart.findOne({
    where: { userId, state: true },
  })
    .then((cart) => {
      const productIndex = cart.products.findIndex(
        (item) => item.productId === productId
      );
      let arr = [];

      if (productIndex === -1) {
        cart.update({
          products: [...cart.products, { quantity: 1, productId }],
        });
      } else {
        const updatedProducts = cart.products.map((product, index) => {
          if (index === productIndex) {
            return { ...product, quantity: product.quantity + 1 };
          } else {
            return product;
          }
        });

        cart.update({ products: updatedProducts });
      }

      res.send(cart);
    })
    .catch(next);
});

// Delete product by ID from cart
//FRONT!! mandar dentro de la ruta el ID del USER y el ID del PRODUCT a eliminar
router.post("/:userId/delete/:productId", (req, res, next) => {
  const { userId, productId } = req.params;

  User.findByPk(userId).then((user) => {
    if (!user) res.status(404).send("User not found");
  });
  Product.findByPk(productId).then((product) => {
    if (!product) res.status(404).send("User not found");
  });

  Cart.findOne({
    where: { userId, state: true },
  })
    .then((cart) => {
      const productIndex = cart.products.findIndex(
        (item) => item.productId === productId
      );

        if (cart.products[productIndex].quantity > 1) {
          const updatedProducts = cart.products.map((product, index) => {
            if (index === productIndex) {
              return { ...product, quantity: product.quantity - 1 };
            } else {
              return product;
            }
          });
          cart.update({ products: updatedProducts });
        } else {
          const updatedProducts = cart.products.filter(
            (product) => product.productId !== productId
          );
          cart.update({ products: updatedProducts });
        }
      

      res.send(cart);
    })
    .catch(next);
});

// nuevo

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
          res.status(400).send({ error: "failed to send the email" });
        } else {
          Cart.products
            .findByPk(productId)
            .then((item) => {
              item.destroy().then((data) => res.status(200).send(data));
            })
            .catch(() =>
              res
                .status(400)
                .send({ error: "failed to delete the purchased product" })
            );
          res.status(200).send(data);
        }
      });
    })
    .catch(() => res.status(400).send({ error: "failed to send the email" }));
});

module.exports = router;
