const express = require("express");
const { Artist, Product } = require("../models");
const router = express.Router();

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
    })
    .catch(next);
});

module.exports = router;
