const express = require("express");
const { Artist, Product } = require("../models");
const router = express.Router();
const S = require("sequelize");

// Search artists by name

router.get("/artist", (req, res, next) => {
  Artist.findAll({
    where: {
      [S.Op.or]: [{ title: { [S.Op.like]: `%${req.query.input}%` } }],
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

router.get("/product", (req, res, next) => {
  Product.findAll({
    where: {
      [S.Op.or]: [{ name: { [S.Op.like]: `%${req.query.input}%` } }],
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

router.get("/:category", (req, res, next) => {
  const category = req.params.category;
  Product.findAll({
    where: {
      category: {
        [S.Op.contains]: [category],
      },
    },
  })
    .then((results) => {
      res.send(results);
    })
    .catch(next);
});

module.exports = router;
