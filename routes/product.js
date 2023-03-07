const express = require("express");
const router = express.Router();
const { Product, Artist } = require("../models");
const {
  charlesWhite,
  GeorgiaOKeeffe,
  JohnSingerSargent,
  GeorgesSeurat,
  IvanAlbright,
} = require("../config/seedProducts");

router.get('/', (req, res, next) => {
    
})


module.exports = router