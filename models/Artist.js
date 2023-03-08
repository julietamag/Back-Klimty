const S = require("sequelize");
const db = require("../db");

class Artist extends S.Model {}

Artist.init(
  {
    title: {
      type: S.STRING,
      allowNull: false,
    },
    description: {
      type: S.TEXT,
      allowNull: false,
    },
  },
  { sequelize: db, modelName: "artist" }
);

module.exports = Artist;