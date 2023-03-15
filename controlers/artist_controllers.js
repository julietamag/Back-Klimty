const { Artist, Product, User } = require("../models");
const artists = require("../config/seedArtists.js");

exports.find_by_id_get = async (req, res, next) => {
    try {
        const foundArtist = await Artist.findOne({
          where: { id: req.params.id, }, include: { model: Product }})
        return res.status(200).send(foundArtist)
      }
      catch (err) {
       return next(err)
      }
}

exports.find_all_artist_get = async (req, res, next) => {
    try {
        const allArtist = await Artist.findAll()
        return res.status(200).send(allArtist)
      } catch (err) {
       return next(err)
      }
}

exports.create_bulk_post = async (req, res, next) => {
    try {
        const bulkArtists = await Artist.bulkCreate(artists)
        return res.status(201).send(bulkArtists)
      } catch (err) {
        next(err)
      }
}

exports.admin_by_artist_id_delete = async (req, res, next) => {
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
}

exports.admin_add_artist_post = async (req, res, next) => {
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
}


exports.admin_edit_by_artist_id_put = async (req, res, next) => {
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
}
