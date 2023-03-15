const express = require("express");
const router = express.Router();
const { Cart } = require("../models");
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const Checkout = require("../models/Checkout");
const checkout_controller = require("../controlers/checkout_controller")


router.post("/:userId", checkout_controller.crete_checkout_email_post);

router.get("/:userId/history", checkout_controller.find_user_buy_history_get);

module.exports = router;
