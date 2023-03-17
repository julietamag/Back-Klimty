const { Artist, Product } = require("../models");
const S = require("sequelize")

const findByArtist = async (artist) => {
    try {
        const OneArtist = await Artist.findOne({ where: { title: artist, }, })
        const allProducts = await Product.findAll({ where: { artistId: OneArtist.id, }, })
       return allProducts
      } catch (err) {
        return err
      }
}

const findArtistByInput = async (input) => {
    try {
        const searchArtist = await Artist.findAll({where: {[S.Op.or]: [{ title: { [S.Op.like]: `%${input}%` } }],},
          include: { model: Product, },
        })
        if (!searchArtist) {
          return res.status(404)
        } 
        return searchArtist
      } catch (err) {
        return(err)
      }
}

const findProductByInput = async (input) => {
    try {
        const searchProduct = await Product.findAll({where: {[S.Op.or]: [{ name: { [S.Op.like]: `%${input}%` } }],},
          include: { model: Artist, },
        })
        if (searchProduct) {
          return searchProduct
        }
        return {error: "product not found"}
      } catch (err) {
        return(err)
      }
}

const findAllCategories = async () => {
    try {
        const allProducts = await Product.findAll()
       const categories = allProducts.map((product) => {
        return product.category;}).flat().filter((category, index, self) => {
          return index === self.indexOf(category);
        });
        return categories
      } catch (err) {
        return(err)
      }
}

const findProductByCategory = async (category) => {
    try {
      const products = await Product.findAll({where: {category: {[S.Op.contains]: [category],},},
      })
        return products
      } catch (err) {
       return(err)
    }
}

module.exports = { findByArtist, findArtistByInput, findProductByInput, findAllCategories, findProductByCategory }