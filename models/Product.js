const S = require("sequelize");
const db = require("../db");

class Product extends S.Model {}

Product.init(
  {
    name: {
      type: S.STRING,
      allowNull: false,
    },
    price: {
      type: S.FLOAT,
      allowNull: false,
    },
    description: {
      type: S.TEXT,
    },
    category: {
      type: S.STRING,
    },
    photo_url: {
      type: S.STRING,
      defaultValue:
        "https://community.atlassian.com/t5/image/serverpage/image-id/127481i2A3E643B5F41B152?v=v2",
    },
    // AMOUNT??? QUE CANTIDAD DE UN MISMO PRODUCTO TENGO EN EL CARRITO??
  },
  { sequelize: db, modelName: "product" }
);

module.exports = Product;
