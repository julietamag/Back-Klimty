const express = require("express");
const { Artist, Product } = require("../models");
const router = express.Router();
const { Artist } = require("../models");
const artists = require("../config/seedArtists.js");


// GET all info about artist by id
// FRONT!! => deben enviar el id del artista solicitado por parametro
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

module.exports = router;

