require('dotenv').config()

const PORT = process.env.PORT
const SEQUELIZE_DIALECT = process.env.SEQUELIZE_DIALECT
const SEQUELIZE_STORAGE = process.env.SEQUELIZE_STORAGE
const SECRET = process.env.SECRET
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY
const SENDGRID_SENDER = process.env.SENDGRID_SENDER

module.exports = {
  PORT,
  SEQUELIZE_DIALECT,
  SEQUELIZE_STORAGE,
  SECRET,
  SENDGRID_API_KEY,
  SENDGRID_SENDER
}
