const express = require("express");
const router = express.Router();
const { Artist, Product, User } = require("../models");
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
  }).then((results) => {
    if (!results) res.statusCode(404);
    res.send(results);
  });
});

// GET all info about ALL artist
router.get("/", (req, res, next) => {
  Artist.findAll()
    .then((artists) => {
      return res.send(artists);
    })
    .catch(next);
});

// SEED
router.post("/", (req, res, next) => {
  Artist.bulkCreate(artists)
    .then((createdArtists) => {
      return res.status(201).send(createdArtists);
    })
    .catch(next);
});

// ADMIN!! =>
// DELETE AN ARTIST
router.delete("/:userId/delete/:artistId", (req, res, next) => {
  const { userId, artistId } = req.params;
  User.findByPk(userId)
    .then((user) => {
      if (user.isAdmin === true) {
        Artist.findByPk(artistId)
          .then((artist) => {
            artist.destroy().then((data) => res.status(202).send(data));
          })
          .catch(() => ({ error: "the artist couldn't be found" }));
      } else {
        res.status(401).send({ error: "the user is not admin" });
      }
    })
    .catch(next);
});

//  add AN ARTIST
// FRONT! manden title, description en BODY :)
router.post("/:userId/add", (req, res, next) => {
  const userId = req.params.userId;
  const { title, description } = req.body;
  User.findByPk(userId)
    .then((user) => {
      if (user.isAdmin === true) {
        Artist.create({ title, description })
          .then((artist) => {
            res.status(202).send(artist);
          })
          .catch(next);
      } else {
        res.status(401).send({ error: "the user is not admin" });
      }
    })
    .catch(next);
});

// EDIT AN ARTIST
// FRONT! manden title, description en BODY :)
router.put("/:userId/edit/:artistId", (req, res, next) => {
  const { userId, artistId } = req.params;

  const { title, description } = req.body;
  User.findByPk(userId)
    .then((user) => {
      if (user.isAdmin === true) {
        Artist.findByPk(artistId)
          .then((noEditedArtist) => {
            noEditedArtist
              .update({ title, description })
              .then((editArtist) => {
                res.status(201).send(editArtist);
              })
              .catch(() => ({ error: "failed to edit the artist" }));
          })
          .catch(() => ({ error: "the artist couldn't be edited" }));
      } else {
        res.status(401).send({ error: "the user is not admin" });
      }
    })
    .catch(next);
});

module.exports = router;
