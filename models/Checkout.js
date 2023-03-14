const S = require("sequelize");
const db = require("../db");

class Checkout extends S.Model {}

Checkout.init(
  {
    name: {
      type: S.STRING,
      allowNull: false,
    },
    lastName: {
      type: S.STRING,
      allowNull: false,
    },
    fullName: {
        type: S.VIRTUAL,
        get() {
          return `${this.name} ${this.lastName}`;
        },
      },
    address1: {
      type: S.STRING,
      allowNull: false,
    },
    address2: {
      type: S.STRING,
    },
    city: {
      type: S.STRING,
      allowNull: false,
    },
    region: {
      type: S.STRING,
    },
    country: {
      type: S.STRING,
      allowNull: false,
    },
    zip: {
      type: S.STRING,
      allowNull: false,
    },
    state: {
      type: S.ENUM("pending", "completed", "rejected"),
      allowNull: false,
    },
  },
  { sequelize: db, modelName: "checkout" }
);

module.exports = Checkout;
