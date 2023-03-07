const Sequelize = require('sequelize');
const envs = require('../config/_envs')

const db = new Sequelize(envs.DB_NAME, null, null, {
    host: envs.HOST,
    logging: false,
    dialect: 'postgres'
})

module.exports = db;