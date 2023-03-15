const Sequelize = require('sequelize');
const {DB_NAME, PORT, PASS, HOST} = require('../config/_envs')

const db = new Sequelize(DB_NAME, null, null, {
    host: HOST,
    logging: false,
    dialect: 'postgres'
})

module.exports = db;