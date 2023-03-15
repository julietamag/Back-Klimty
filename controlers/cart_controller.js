const { Cart, User } = require("../models");

exports.find_all_get = async (req, res, next) => {
    try {
        const allCarts = await Cart.findAll()
        return res.status(200).send(allCarts)
      } catch (err) {
        return next(err)
      } 
}

exports.find_by_id_get = async (req, res, next) => {
    try {
        const foundCart = await Cart.findOne({ where: { userId: req.params.userId, state: true } })
        return res.status(200).send(foundCart)
      } catch (err) {
        return next(err)
      }
}

exports.update_cart_post = async (req, res, next) => {
    try {
        const foundCartOrCreated = await Cart.findOrCreate({ where: { userId: req.params.userId, state: true } })
        const cartId = foundCartOrCreated[0].dataValues.id;
        const updatedCart = await Cart.update(req.body, { where: { id: cartId }, returning: true })
        res.status(200).send(updatedCart)
      } catch (err) {
        return next(err)
      }
}

exports.create_new_cart_post = async (req, res, next) => {
    try {
        const CreateCart = await Cart.findOrCreate({ where: { userId: req.params.userId, state: true } })
        return res.status(201).send(CreateCart)
      } catch (err) {
       return next(err)
      }
}