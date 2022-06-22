const { Sequelize } = require('sequelize')
const { 
  SEQUELIZE_DIALECT,
  SEQUELIZE_STORAGE 
} = require('./config')

const sequelize = new Sequelize({
  dialect: SEQUELIZE_DIALECT,
  storage: SEQUELIZE_STORAGE,
  logging: true
})

module.exports = sequelize
