const express = require("express");
const router = express.Router();
const { Artist } = require("../models");
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

module.exports = router;
