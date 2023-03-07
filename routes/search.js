const express = require("express");
const { Artist, Product } = require("../models");
const router = express.Router();

// GET all info about artist by name
// FRONT!! => deben agrear un body con el user input bajo la categoria 'input'
router.get("/artist", (req, res, next) => {
  Artist.findAll({
    where: {
      [S.Op.or]: [{ name: { [S.Op.like]: `%${req.body.input}%` } }],
    },
    include: {
      model: Product,
    },
  })
    .then((results) => {
      if (!results) res.statusCode(404);
      res.send(results);
    })
    .catch(next);
});

// GET all info about product by name
// FRONT!! => deben agrear un body con el user input bajo la categoria 'input'
router.get("/product", (req, res, next) => {
    Product.findAll({
      where: {
        [S.Op.or]: [{ name: { [S.Op.like]: `%${req.body.input}%` } }],
      },
      include: {
        model: Artist,
      },
    })
      .then((results) => {
        if (!results) res.statusCode(404);
        res.send(results);
      })
      .catch(next);
  });


// GET all info about products by category
// FRONT!! => deben agrear un body con el user input bajo la categoria 'input'
router.get("/category", (req, res, next) => {
    Product.findAll({
      where: {
        [S.Op.or]: [{ category: { [S.Op.like]: `%${req.body.input}%` } }],
      },
      include: {
        model: Artist,
      },
    })
      .then((results) => {
        if (!results) res.statusCode(404);
        res.send(results);
      })
      .catch(next);
  });


module.exports = router;
