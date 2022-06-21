require('dotenv').config()

const PORT = process.env.PORT
const SEQUELIZE_DIALECT = process.env.SEQUELIZE_DIALECT
const SEQUELIZE_STORAGE = process.env.SEQUELIZE_STORAGE

module.exports = {
  PORT,
  SEQUELIZE_DIALECT,
  SEQUELIZE_STORAGE
}
