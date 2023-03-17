const { Cart, User } = require("../models");
const cart_service = require("../services/cart_service")

exports.find_all_get = async (req, res, next) => {
  const CartAll = await cart_service.findAll()
  return res.send(CartAll)
}

exports.find_by_id_get = async (req, res, next) => {
  const userId = req.params.userId
  const foundCart = await cart_service.findCartByid(userId)
  return res.send(foundCart)
}

exports.update_cart_post = async (req, res, next) => {
  const userId = req.params.userId
  const cart = req.body
  const fullerCart = await cart_service.updateCart(userId, cart)
  return res.send(fullerCart)
}

exports.create_new_cart_post = async (req, res, next) => {
  const userId = req.params.userId
  const newCart = await cart_service.createCart(userId)
  return res.send(newCart)
}