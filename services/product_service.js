const { Product, Artist, User } = require("../models");

const findAll = async () => {
    try {
        const allProducts = await Product.findAll({ include: { model: Artist } })
        return allProducts
      } catch (err) {
        return(err)
      }
}

const bulkArtist = async (artistId, createdProducts, artists) => {
    for (const artist of artists) {
        try {
          const products = await Product.bulkCreate(
            artist.map((artwork) => ({ ...artwork, artistId }))
          );
          createdProducts.push(...products);
          artistId++;
          if (artistId > artists.length) {
            return createdProducts
          }
        } catch (error) {
          return(error);
        }
      } 
}

const findById = async (id) => {
    try {
        const productFound = await Product.findOne({ where: { id: id, }, include: { model: Artist } })
        if (productFound) {
         return productFound
        } else {
         return {error: "product not found"}
        }
      } catch (err) {
        return(err)
      }
}

const deleteProduct = async (userId, productId) => {
    try {
        const AdminUser = await User.findByPk(userId)
        if (AdminUser.isAdmin === true) {
          const productToDelete = await Product.findByPk(productId)
         await productToDelete.destroy()
          return "product deleted from database"
        } else {
          return {error:"Your account is not admin"}
        }
      } catch (err) {
        return(err)
      }
}

const addProduct = async (userId, artistId, body ) => {
  try {
      const {name, price, description,category, photo_url} = body
        const AdminUser = await User.findByPk(userId)
        if (AdminUser.isAdmin === true) {
          const newProduct = await Product.create({name, price, description,category, photo_url, artistId})
          return newProduct
        } else {
          return {error:"Your account is not admin"}
        }
      } catch (err) {
        return(err)
      }
}

const editProduct = async (userId, productId, name, price, description, category) => {
    try {
        const AdminUser = await User.findByPk(userId)
        if (AdminUser.isAdmin === true) {
          const productToEdit = await Product.findByPk(productId)
          const editedProduct = await productToEdit.update({name, price, description, category})
          return editedProduct
        } else {
          return {error:"Your account is not admin"}
        }
      } catch (err) {
        return(err)
      }
}



module.exports = { findAll, bulkArtist, findById, deleteProduct, addProduct, editProduct }