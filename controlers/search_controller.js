const { Artist, Product } = require("../models");
const S = require("sequelize")
const search_service = require("../services/search_service")

exports.find_artworks_by_artist_get = async (req, res, next) => {
  const artist = req.params.artist
  const arworks = await search_service.findByArtist(artist)
  return res.send(arworks)
}

exports.find_artist_input_get = async (req, res, next) => {
  const input = req.query.input
  const artist = await search_service.findArtistByInput(input)
  return res.send(artist)
}

exports.find_product_by_input_get = async (req, res, next) => {
  const input = req.query.input
  const product = await search_service.findProductByInput(input)
  return res.send(product)
}

exports.find_all_categories_get = async (req, res, next) => {
  const categories = await search_service.findAllCategories()
  return res.send(categories)
}

exports.find_product_by_category = async (req, res, next) => {
  const category = req.params.category
  const product = await search_service.findProductByCategory(category)
  return res.send(product)
}