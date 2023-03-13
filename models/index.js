const User = require('../models/User')
const Cart = require('../models/Cart')
const Product = require('../models/Product')
const Artist = require('../models/Artist')


// USER HAS MANY CART
// CART HAS ONE USER
User.hasMany(Cart)
Cart.belongsTo(User)

// ARTIST HAS MANY PRODUCT
// PRODUCT HAS ONE ARTIST 
Artist.hasMany(Product)
Product.belongsTo(Artist)

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


