const { Artist, Product } = require("../models");
const S = require("sequelize")

exports.find_artworks_by_artist_get = async (req, res, next) => {
    try {
        const OneArtist = await Artist.findOne({ where: { title: req.params.artist, }, })
        const allProducts = await Product.findAll({ where: { artistId: OneArtist.id, }, })
       return res.status(200).send(allProducts)
      } catch (err) {
        return next(err)
      }
}

exports.find_artist_input_get = async (req, res, next) => {
    try {
        const searchArtist = await Artist.findAll({where: {[S.Op.or]: [{ title: { [S.Op.like]: `%${req.query.input}%` } }],},
          include: { model: Product, },
        })
        if (!searchArtist) {
          return res.status(404)
        } 
        return res.status(200).send(searchArtist)
      } catch (err) {
        return next(err)
      }
}

exports.find_product_by_input_get = async (req, res, next) => {
    try {
        const searchProduct = await Product.findAll({where: {[S.Op.or]: [{ name: { [S.Op.like]: `%${req.query.input}%` } }],},
          include: { model: Artist, },
        })
        if (searchProduct) {
          return res.status(200).send(searchProduct)
        }
        return res.status(404).send({error: "product not found"})
      } catch (err) {
        return next(err)
      }
}

exports.find_all_categories_get = async (req, res, next) => {
    try {
        const allProducts = await Product.findAll()
       const categories = allProducts.map((product) => {
        return product.category;}).flat().filter((category, index, self) => {
          return index === self.indexOf(category);
        });
        return res.send(categories)
      } catch (err) {
        return next(err)
      }
}

exports.find_product_by_category = async (req, res, next) => {
    try {
        const category = req.params.category
      const products = await Product.findAll({where: {category: {[S.Op.contains]: [category],},},
      })
        return res.status(200).send(products)
      } catch (err) {
       return next(err)
    }
}