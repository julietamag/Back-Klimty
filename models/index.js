const User = require("../models/User");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const Artist = require("../models/Artist");
const Checkout = require("../models/Checkout");
const Review = require("../models/Review");

User.hasMany(Cart);
Cart.belongsTo(User);

Artist.hasMany(Product);
Product.belongsTo(Artist);

User.hasMany(Checkout);
Checkout.belongsTo(User);

Cart.hasOne(Checkout);
Checkout.belongsTo(Cart);

User.hasMany(Review);
Review.belongsTo(User);

Product.hasMany(Review);
Review.belongsTo(Product);

module.exports = {
  User,
  Cart,
  Product,
  Artist,
  Checkout,
  Review,
};
