const express = require("express");
const router = express.Router();
const { Artist, Product, User } = require("../models");
const artists = require("../config/seedArtists.js");
const artist_controller = require("../controlers/artist_controllers")

// GET all info about artist by id
// FRONT!! => deben enviar el id del artista solicitado por parametro
router
    .get("/:id", artist_controller.find_by_id_get)


// GET all info about ALL artist 
    .get("/", artist_controller.find_all_artist_get)

// SEED
    .post("/", artist_controller.create_bulk_post)


// ADMIN!! =>
// DELETE AN ARTIST
    .delete("/:userId/delete/:artistId", artist_controller.admin_by_artist_id_delete)

//  add AN ARTIST
// FRONT! manden title, description en BODY :)
    .post("/:userId/add", artist_controller.admin_add_artist_post)

// EDIT AN ARTIST
// FRONT! manden title, description en BODY :)
    .put("/:userId/edit/:artistId", artist_controller.admin_edit_by_artist_id_put)

module.exports = router;
