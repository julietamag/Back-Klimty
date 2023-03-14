const express = require("express");
const { Artist, Product } = require("../models");
const router = express.Router();
const S = require("sequelize");

// GET all info about artist by name
// FRONT!! pasar user input bajo query 'input'

router.get("/artworks/:artist", (req, res, next) => {
  const titleArtist = req.params.artist;
  console.log("INFO BACK", titleArtist);
  Artist.findOne({
    where: {
      title: titleArtist,
    },
  }).then((artist) => {
    console.log("INFO BACK", artist);
    Product.findAll({
      where: {
        artistId: artist.id,
      },
    })
      .then((results) => {
        res.send(results);
      })
      .catch(next);
  });
});

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
// FRONT!! pasar user input bajo query 'input'
router.get("/product", (req, res, next) => {
  console.log(req.query.input);
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

// Find all categories

router.get("/categories", (req, res, next) => {
  Product.findAll()
    .then((products) => {
      const categories = products
        .map((product) => {
          console.log("informacion:", product.category);
          return product.category;
        })
        .flat()
        // chequear despues
        .filter((category, index, self) => {
          return index === self.indexOf(category);
        });
      console.log("QUE ES ESTO", categories);
      return categories;
    })
    .then((categories) => {
      return res.send(categories);
    })

    .catch(next);
});

// GET all info about products by category

router.get("/products/:category", (req, res, next) => {
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
