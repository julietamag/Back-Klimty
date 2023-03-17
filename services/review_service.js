const express = require("express");
const { Review, User } = require("../models");

const createReview = async (userId, productId, data) => {
    try {
        const checkDuplicated = await Review.findOne({
          where: { userId: userId, productId: productId },
        });
        if (checkDuplicated) {
          return {error: "Client cannot set more than one review per product"}
        } else {
          const review = await Review.create({
            ...data,
            userId: userId,
            productId: productId,
          });
          return review
        }
      } catch (error) {
        return(error)
      }
}

const reviewsOfUser = async (userId) => {
    try {
        const reviews = await Review.findAll(
          { where: { userId: userId }, include: {all: true} });
        if (reviews) {
          return reviews
        } else {
          return { error: "Reviews not found" }
        }
      } catch (error) {
        return(error)
      }
}

const reviewsOfProduct = async (productId) => {
    try {
        const reviews = await Review.findAll(
          { where: { productId: productId } , include: {all: true}},);
        if (reviews) {
          return(reviews);
        } else {
          return{ error: "Reviews not found" }
        }
      } catch (error) {
        return(error)
      }
}

module.exports = { createReview, reviewsOfUser, reviewsOfProduct }