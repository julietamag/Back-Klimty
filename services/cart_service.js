const { Cart, User } = require("../models");

const findAll = async () => {
    try {
        const allCarts = await Cart.findAll()
        return allCarts
      } catch (err) {
        return(err)
      } 
}

const findCartByid = async (userId) => {
    try {
        const foundCart = await Cart.findOne({ where: { userId: userId, state: true } })
        return foundCart
      } catch (err) {
        return(err)
      }
}

const updateCart = async (userId, cart) => {
    try {
        const foundCartOrCreated = await Cart.findOrCreate({ where: { userId: userId, state: true } })
        const cartId = foundCartOrCreated[0].dataValues.id;
        const updatedCart = await Cart.update(cart, { where: { id: cartId }, returning: true })
        return updatedCart
      } catch (err) {
        return(err)
      }
}

const createCart = async (userId) => {
    try {
        const CreateCart = await Cart.findOrCreate({ where: { userId: userId, state: true } })
        return CreateCart
      } catch (err) {
       return(err)
      }
}


module.exports = { findAll, findCartByid, updateCart, createCart}