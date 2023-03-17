const { Product, Artist, User } = require("../models");
const product_service = require("../services/product_service")
const {
  charlesWhite,
  GeorgiaOKeeffe,
  JohnSingerSargent,
  GeorgesSeurat,
  IvanAlbright,
  MariaHelenaVieira,
  andyWarhol,
  grantWood,
} = require("../config/seedProducts");


exports.find_all_get = async (req, res, next) => {
  const allPaintings = await product_service.findAll()
  return res.send(allPaintings)
}

const artists = [
  charlesWhite,
  GeorgiaOKeeffe,
  JohnSingerSargent,
  GeorgesSeurat,
  IvanAlbright,
  MariaHelenaVieira,
  grantWood,
  andyWarhol,
];

exports.create_bulk_by_artist_post = async (req, res, next) => {
  const createdProducts = [];
  let artistId = 1;
  const createdAritst = await product_service.bulkArtist(artistId, createdProducts, artists)
  return res.send(createdAritst)
}


exports.find_by_id_get = async (req, res, next) => {
  const id = req.params.id
  const foundArtist = await product_service.findById(id)
  return res.send(foundArtist)
}

exports.admin_by_product_id_delete = async (req, res, next) => {
  const userId = req.params.userId
  const productId = req.params.productId
  const erasedProduct = await product_service.deleteProduct(userId, productId)
  return res.send(erasedProduct)
}

exports.admin_add_post = async (req, res, next) => {
  const userId = req.params.userId
  const { name, price, description, category, photo_url } = req.body;
  const newProduct = await product_service.addProduct(userId, name, price, description, category, photo_url)
  return res.send(newProduct)
}

exports.admin_edit_product_put = async (req, res, next) => {
  const userId = req.params.userId
  const productId = req.params.productId
  const { name, price, description, category } = req.body;
  const editPaint = await product_service.editProduct(userId, productId, name, price, description, category)
  return res.send(editPaint)
}