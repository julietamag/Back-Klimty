const express = require("express");
const router = express.Router();
const { Product, Artist } = require("../models");
const {
  charlesWhite,
  GeorgiaOKeeffe,
  JohnSingerSargent,
  GeorgesSeurat,
  IvanAlbright,
  MariaHelenaVieira,
  andyWarhol,
  grantWood,
} = require("../config/seedProducts");

router.get("/", (req, res, next) => {
  Product.findAll()
    .then((artists) => {
      return res.send(artists);
    })
    .catch(next);
});

const artists = [
  charlesWhite,
  GeorgiaOKeeffe,
  JohnSingerSargent,
  GeorgesSeurat,
  IvanAlbright,
  MariaHelenaVieira,
  grantWood,
  andyWarhol,
];

// SEED
router.post("/", async (req, res, next) => {
  const createdProducts = [];
  let artistId = 1;

  for (const artist of artists) {
    try {
      const products = await Product.bulkCreate(
        artist.map((artwork) => ({ ...artwork, artistId }))
      );
      createdProducts.push(...products);
      artistId++;
      if (artistId > artists.length) {
        return res.status(201).send(createdProducts);
      }
    } catch (error) {
      console.error(error);
    }
  }
});

// GET product por ID
router.get("/:id", (req, res, next) => {
  Product.findOne({
    where: {
      id: req.params.id,
    },
    include: {
      model: Artist
    },
  })
    .then((results) => {
      if (!results) res.statusCode(404);
      res.send(results);
    })
    .catch(next);
});

module.exports = router;
