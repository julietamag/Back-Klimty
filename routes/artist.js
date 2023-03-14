const express = require("express");
const router = express.Router();
const { Artist, Product, User } = require("../models");
const artists = require("../config/seedArtists.js");

// GET all info about artist by id
// FRONT!! => deben enviar el id del artista solicitado por parametro
router.get("/:id", async (req, res, next) => {
  try {
    const foundArtist = await Artist.findOne({
      where: { id: req.params.id, }, include: { model: Product }})
    return res.status(200).send(foundArtist)
  }
  catch (err) {
   return next(err)
  }
});

// GET all info about ALL artist 
router.get("/", async (req, res, next) => {
  try {
    const allArtist = await Artist.findAll()
    return res.status(200).send(allArtist)
  } catch (err) {
   return next(err)
  }
});

// SEED
router.post("/", async (req, res, next) => {
  try {
    const bulkArtists = await Artist.bulkCreate(artists)
    return res.status(201).send(bulkArtists)
  } catch (err) {
   return next(err)
  }
});


// ADMIN!! =>
// DELETE AN ARTIST
router.delete("/:userId/delete/:artistId", async (req, res, next) => {
  try {
    const admin = await User.findByPk(req.params.userId)
    if (admin.isAdmin === true) {
      const artistToDelete = await Artist.findByPk(req.params.artistId)
     await artistToDelete.destroy()
      return res.status(204).send("Artist deleted from database")
    } else {
      return res.status(401).send({error: "Account is not admin"})
    }
  } catch (err) {
    return next(err)
  }
});

//  add AN ARTIST
// FRONT! manden title, description en BODY :)
router.post("/:userId/add", async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const admin = await User.findByPk(req.params.userId)
    if (admin.isAdmin === true) {
      const newArtist = await Artist.create({title, description})
      return res.status(201).send(newArtist)
    } else {
      return res.status(401).send({error: "Account is not admin"})
    }
  } catch (err) {
    return next(err)
  }
});

// EDIT AN ARTIST
// FRONT! manden title, description en BODY :)
router.put("/:userId/edit/:artistId", async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const admin = await User.findByPk(req.params.userId)
    if (admin.isAdmin === true) {
      const artistToEdit = await Artist.findByPk(req.params.artistId)
     const editedArtist = await artistToEdit.update({title, description})
      return res.status(200).send(editedArtist)
    } else {
      return res.status(401).send({error: "Account is not admin"})
    }
  } catch (err) {
    return next(err)
  }
});

module.exports = router;
