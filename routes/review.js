const express = require("express");
const { Review, User } = require("../models");
const router = express.Router();

router.post("/:userId/:productId", async (req, res, next) => {
  const { userId, productId } = req.params;
  try {
    const checkDuplicated = await Review.findOne({
      where: { userId: userId, productId: productId },
    });
    if (checkDuplicated) {
      res.status(400).send({
        message: "Client cannot set more than one review per product",
      });
    } else {
      const review = await Review.create({
        ...req.body,
        userId: userId,
        productId: productId,
      });
      res.status(201).send(review);
    }
  } catch (error) {
    console.log(error);
    res.status(404).send({ message: "Error producing Review" });
  }
});

router.get("/user/:userId", async (req, res, next) => {
  const { userId } = req.params;
  try {
    const reviews = await Review.findAll(
      { where: { userId: userId }, include: {all: true} }
 
    );
    if (reviews) {
      res.send(reviews);
    } else {
      res.status(404).send({ message: "Reviews not found" });
    }
  } catch (error) {
    res.status(404).send(error, {message: 'Error getting all reviews from user'});
  }
});


router.get("/product/:productId", async (req, res, next) => {
    const { productId } = req.params;
    try {
      const reviews = await Review.findAll(
        { where: { productId: productId } , include: {all: true}},
       
      );
      if (reviews) {
        res.send(reviews);
      } else {
        res.status(404).send({ message: "Reviews not found" });
      }
    } catch (error) {
      res.status(404).send({message: 'Error getting all reviews of product'});
    }
  });


module.exports = router;
