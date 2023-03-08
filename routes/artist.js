const express = require("express");
const router = express.Router();
const { Artist, Product } = require("../models");
const artists = require("../config/seedArtists.js");

router.get("/", (req, res, next) => {
  Artist.findAll()
    .then((artists) => {
      return res.send(artists);
    })
    .catch(next);
});

router.post("/", (req, res, next) => {
  Artist.bulkCreate(artists)
    .then((createdArtists) => {
      return res.status(201).send(createdArtists);
    })
    .catch(next);
});

router.get("/:id", (req, res, next) => {
  Artist.findOne({
    where: {
      id: req.params.id,
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

module.exports = router;
