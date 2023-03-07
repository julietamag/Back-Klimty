const S = require("sequelize");
const db = require("../db");

class Cart extends S.Model {}

Cart.init(
  {
    state: {
      type: S.BOOLEAN,
      allowNull: false,
    },
    total_amount: {
      type: S.VIRTUAL,
      allowNull: false,
      defaultValue: 0
    },
    products: {
        type: S.ARRAY(S.INTEGER) // or STRING?
    }
  },
  { sequelize: db, modelName: "cart" }
);

module.exports = Cart;