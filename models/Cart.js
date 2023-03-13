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
      defaultValue: 0,
      get(){
        return this.products.reduce((acc, item) => {
          return acc + item.price
        }, 0) 
      }
    },
    products: {
      type: S.DataTypes.JSONB,
      defaultValue: [],
    },
  },
  { sequelize: db, modelName: "cart" }
);

module.exports = Cart;
