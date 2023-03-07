const S = require("sequelize");
const db = require("../db");

class Artist extends S.Model {}

Artist.init(
  {
    name: {
      type: S.STRING,
      allowNull: false,
    },
    bio: {
      type: S.TEXT,
      allowNull: false,
    },
  },
  { sequelize: db, modelName: "artist" }
);

module.exports = Artist;