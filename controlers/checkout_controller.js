const { Cart, User, Product } = require("../models");
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const Checkout = require("../models/Checkout");

exports.crete_checkout_email_post = async (req, res, next) => {
    const userId = req.params.userId;
    const state = "pending";
    const { name, lastName, address1, address2, city, zip, country, region } =
      req.body;
    try {
      const cart = await Cart.findOne({ where: { userId, state: true } });
      const checkout = await Checkout.create({
        ...req.body.checkout,
        state: state,
        userId: cart.userId,
        cartId: cart.id,
      });
      const checkoutFinal = await Checkout.findByPk(checkout.id, {
        include: { all: true },
      });
  
      const oldCart = await Cart.update(
        { state: false },
        { where: { id: cart.id } }
      );
      const newCart = await Cart.create({
        userId,
        state: true,
      });
  
      let transport = nodemailer.createTransport(
        smtpTransport({
          service: "gmail",
          host: "smtp.gmail.com",
          auth: {
            user: "klimtyecommerce@gmail.com",
            pass: "auaboiqezvqpvulg",
          },
        })
      );
      const { name, lastName, email } = checkoutFinal.user;
  
      const message = {
        from: "klimtyecommerce@gmail.com",
        to: email,
        subject: `This is your Klimty order ⚡️`,
        html: `<h2>Hi ${name} ${lastName}!</h2> 
              <h3>This is your purchase:</h3> 
              <br></br>
              <ul>
              ${checkoutFinal.cart.products.map(
                (item) => `  <div class="card">
                <h4>${item.product.name}</h4>
                <p class="price">Price: $ ${item.product.price}</p>
                <p>Quantity: ${item.quantity}</p>
                </div>`
              )}
                </ul>
                <h5>Thanks for buying in Klimty</h5> 
                <br></br>
                <p>To make a rewiew of your purchased. we asked to go to your Account settings and rewied the product you like.</p>
                `,
      };
      transport.sendMail(message, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Message sent: ", data.messageId);
        }
      });
  
      res.status(201).send(checkoutFinal);
    } catch (error) {
      console.log(error);
      res.status(404).send(error);
    }
}

exports.find_user_buy_history_get = async (req, res, next) => {
    const userId = req.params.userId;
    try {
      const orders = await Checkout.findAll({
        where: { userId },
  
        include: { all: true },
      });
      res.status(200).send(orders);
    } catch (error) {
      console.log(error);
      res.status(404).send(error);
    }
}