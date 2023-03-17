const express = require("express");
const { Review, User } = require("../models");
const review_service = require("../services/review_service")

exports.create_review_post = async (req, res, next) => {
    const { userId, productId } = req.params;
  const data = req.body
  const newReview = await review_service.createReview(userId, productId, data)
  return res.send(newReview)
}

exports.find_user_reviews_get = async (req, res, next) => {
  const { userId } = req.params;
  const userReviews = await review_service.reviewsOfUser(userId)
  return res.send(userReviews)
}

exports.find_reviews_of_product_get = async (req, res, next) => {
  const { productId } = req.params;
  const reviews = await review_service.reviewsOfProduct(productId)
  return res.send(reviews)
  }
