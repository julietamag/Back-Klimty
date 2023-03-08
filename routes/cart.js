const express = require("express");
const {Cart} = require("../models");
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
//FRONT!! mandar dentro de la ruta el ID del CART y en el BODY el ID del PRODUCT a agregar
router.post("/:id/add-product", (req, res, next) => {
  Cart.findByPk(req.params.id)
    .then((cart) => {
      if (!cart) {
        return res.status(404).send({ message: "Cart not found" });
      }
      const productId = req.body.productId;
      if (!productId) {
        return res.status(404).send({ message: "Product ID is required" });
      }
      const products = cart.products;
      if (!products.includes(productId)) {
        products.push(productId);
        cart
          .update({ products: products })
          .then((cart) => res.status(201).send(cart));
      }

      // QUE HACEMOS CON LAS CANTIDADES DE LOS PRODUCTOS??????????????
    })
    .catch(next);
});

// Delete product by ID from cart
//FRONT!! mandar dentro de la ruta el ID del CART y en el BODY el ID del PRODUCT a eliminar
router.post("/:id/delete-product", (req, res, next) => {
  Cart.findByPk(req.params.id)
    .then((cart) => {
      if (!cart) {
        return res.status(404).send({ message: "Cart not found" });
      }
      const productId = req.body.productId;
      if (!productId) {
        return res.status(404).send({ message: "Product ID is required" });
      }
      const products = cart.products;
      const index = products.indexOf(productId);
      if (index !== -1) {
        products.slice(index, 1);
        cart
          .update({ products: products })
          .then((cart) => res.status(201).send(cart));
      }

      // QUE HACEMOS CON LAS CANTIDADES DE LOS PRODUCTOS??????????????
    })
    .catch(next);
});

module.exports = router;
