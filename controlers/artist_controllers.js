const { Artist, Product, User } = require("../models");
const artists = require("../config/seedArtists.js");
const artist_service = require("../services/artist_service")

exports.find_by_id_get = async (req, res, next) => {
  const id = req.params.id
  const foundArtist = await artist_service.findById(id)
  return res.send(foundArtist)
}

exports.find_all_artist_get = async (req, res, next) => {
  const allArtist = await artist_service.findAllArtist()
  return res.send(allArtist)
}

exports.create_bulk_post = async (req, res, next) => {
  const createArtists = await artist_service.createBulk(artists)
  return res.send(createArtists)
}

exports.admin_by_artist_id_delete = async (req, res, next) => {
  const userId = req.params.userId
  const artistId = req.params.artistId
  const erasedArtist = await artist_service.deleteArtist(userId, artistId)
  return res.send(erasedArtist)
}

exports.admin_add_artist_post = async (req, res, next) => {
  const userId = req.params.userId
  const { title, description } = req.body
  const newArtist = await artist_service.addArtist(userId, title, description)
  return res.send(newArtist)
}


exports.admin_edit_by_artist_id_put = async (req, res, next) => {
  const userId = req.params.userId
  const artistId = req.params.artistId
  const { title, description } = req.body
  const modifiedArtist = await artist_service.editArtist(userId, artistId, title, description)
  return res.send(modifiedArtist)
}
