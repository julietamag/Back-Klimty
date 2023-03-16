const { Cart, User, Product } = require("../models");
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const Checkout = require("../models/Checkout");
const checkout_service = require("../services/checkout_service")

exports.crete_checkout_email_post = async (req, res, next) => {
  const userId = req.params.userId;
  const state = "pending";
  const body = req.body.checkout
  const newCheckout = await checkout_service.createCheckout(userId, state, body)
  return res.send(newCheckout)
}

exports.find_user_buy_history_get = async (req, res, next) => {
  const userId = req.params.userId;
  const history = await checkout_service.findHistory(userId)
  return res.send(history)
}