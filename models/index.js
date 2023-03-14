const User = require('../models/User')
const Cart = require('../models/Cart')
const Product = require('../models/Product')
const Artist = require('../models/Artist')
const Checkout = require('../models/Checkout')


// USER HAS MANY CART
// CART BELONGS TO USER
User.hasMany(Cart)
Cart.belongsTo(User)

// ARTIST HAS MANY PRODUCT
// PRODUCT BELONGS TO ARTIST 
Artist.hasMany(Product)
Product.belongsTo(Artist)

// USER HAS MANY CHECKOUT
// CHECKOUT BELONGS TO USER 
User.hasMany(Checkout)
Checkout.belongsTo(User)

// CART HAS ONE CHECKOUT
// CHECKOUT BELONGS TO CART 
Cart.hasOne(Checkout)
Checkout.belongsTo(Cart)

// USER HAS MANY REVIEW
// REVIEW HAS ONE USER


// REVIEW HAS ONE PRODUCT
// PRODUCT HAS MANY REVIEW


module.exports = {
    User,
    Cart,
    Product,
    Artist,
   
}


