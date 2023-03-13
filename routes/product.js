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

// GET ALL PRODUCTS
router.get("/", (req, res, next) => {
  Product.findAll({
    include: {
      model: Artist,
    },
  })
    .then((artists) => {
      return res.send(artists);
    })
    .catch(next);
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

// GET PRODUCT BY ID
router.get("/:id", (req, res, next) => {
  Product.findOne({
    where: {
      id: req.params.id,
    },
    include: {
      model: Artist,
    },
  })
    .then((results) => {
      if (!results) res.statusCode(404);
      res.send(results);
    })
    .catch(next);
});

// ADMIN!! =>
// DELETE A PRODUCT
router.delete("/:userId/:productId", (req, res, next) => {
  const userId = req.params.userId;
  const productId = req.params.productId;
  User.findByPk(userId)
    .then((user) => {
      if (user.isAdmin === true) {
        Product.findByPk(productId)
          .then((product) => {
            product.destroy().then((data) => res.status(202).send(data));
          })
          .catch(() => ({ error: "the product coulnd't be found" }));
      } else {
        res.status(401).send({ error: "the user is not admin" });
      }
    })
    .catch(next);
});

// ADD A PRODUCT
router.post("/:userId/add", (req, res, next) => {
  const userId = req.params.userId;
  const { name, price, description, category, photo_url } = req.body;
  User.findByPk(userId)
    .then((user) => {
      if (user.isAdmin === true) {
        Product.create({ name, price, description, category, photo_url })
          .then((product) => {
            res.status(202).send(product);
          })
          .catch(next);
      } else {
        res.status(401).send({ error: "the user is not admin" });
      }
    })
    .catch(next);
});

// EDIT A PRODUCT
router.put("/:userId/edit/:productId", (req, res, next) => {
  const userId = req.params.userId;

  const { name, price, description, category } = req.body;
  User.findByPk(userId)
    .then((user) => {
      if (user.isAdmin === true) {
        Product.findByPk(req.params.productId)
          .then((noEditedProduct) => {
            noEditedProduct
              .update({ name, price, description, category })
              .then((editProduct) => {
                res.status(201).send(editProduct);
              })
              .catch(() => ({ error: "failed to edit the product" }));
          })
          .catch(() => ({ error: "the product coulnd't be edited" }));
      } else {
        res.status(401).send({ error: "the user is not admin" });
      }
    })
    .catch(next);
});

module.exports = router;
