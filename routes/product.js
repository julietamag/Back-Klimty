const express = require("express");
const router = express.Router();
const { Product } = require("../models");
const {
  charlesWhite,
  GeorgiaOKeeffe,
  JohnSingerSargent,
  GeorgesSeurat,
  IvanAlbright,
} = require("../config/seedProducts");

router.get("/", (req, res, next) => {
  Product.findAll()
    .then((artists) => {
      return res.send(artists);
    })
    .catch(next);
});

router.post("/", (req, res, next) => {
  Product.bulkCreate(
    charlesWhite.map((artwork) => ({ ...artwork, artistId: 2 }))
  )
    .then((createdProducts) => {
      return res.status(201).send(createdProducts);
    })
    .catch(next);
});

module.exports = router;