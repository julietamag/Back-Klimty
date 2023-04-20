const Sequelize = require("sequelize");
require("dotenv").config();
const { DB_URL} = process.env;

const db = new Sequelize(DB_URL, { logging: false, dialect: "postgres" })

module.exports = db;