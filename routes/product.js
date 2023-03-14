const express = require("express");
const router = express.Router();
const { Product, Artist, User } = require("../models");
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


router.get("/", async (req, res, next) => {
  try {
    const allProducts = await Product.findAll({ include: { model: Artist } })
    return res.status(200).send(allProducts)
  } catch (err) {
    return next(err)
  }

});

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

// SEED
router.post("/", async (req, res, next) => {
  const createdProducts = [];
  let artistId = 1;

  for (const artist of artists) {
    try {
      const products = await Product.bulkCreate(
        artist.map((artwork) => ({ ...artwork, artistId }))
      );
      createdProducts.push(...products);
      artistId++;
      if (artistId > artists.length) {
        return res.status(201).send(createdProducts);
      }
    } catch (error) {
      console.error(error);
    }
  }
});

// ruta para buscar producto por ID

router.get("/:id", async (req, res, next) => {
  try {
    const productFound = await Product.findOne({ where: { id: req.params.id, }, include: { model: Artist } })
    if (productFound) {
     return res.status(200).send(productFound)
    } else {
     return res.status(404).send({error: "product not found"})
    }
  } catch (err) {
    next(err)
  }
});

router.delete("/:userId/:productId", async (req, res, next) => {
  try {
    const AdminUser = await User.findByPk(req.params.userId)
    if (AdminUser.isAdmin === true) {
      const productToDelete = await Product.findByPk(req.params.productId)
     await productToDelete.destroy()
      return res.status(204).send("product deleted from database") 
    } else {
      return res.status(401).send({error:"Your account is not admin"})
    }
  } catch (err) {
    return next(err)
  }
});

router.post("/:userId/add", async (req, res, next) => {
  try {
    const { name, price, description, category, photo_url } = req.body;
    const AdminUser = await User.findByPk(req.params.userId)
    if (AdminUser.isAdmin === true) {
      const newProduct = await Product.create({name, price, description,category, photo_url})
      return res.status(201).send(newProduct) 
    } else {
      return res.status(401).send({error:"Your account is not admin"})
    }
  } catch (err) {
    return next(err)
  }
});

router.put("/:userId/edit/:productId", async (req, res, next) => {
  try {
    const { name, price, description, category } = req.body;
    const AdminUser = await User.findByPk(req.params.userId)
    if (AdminUser.isAdmin === true) {
      const productToEdit = await Product.findByPk(req.params.productId)
      const editedProduct = await productToEdit.update({name, price, description, category})
      return res.status(200).send(editedProduct) 
    } else {
      return res.status(401).send({error:"Your account is not admin"})
    }
  } catch (err) {
    return next(err)
  }
});

module.exports = router;
