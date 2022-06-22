const { DataTypes } = require('sequelize')
const sequelize = require('../utils/database')

const Usuario = sequelize.define('usuario', {
  username: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  },
  passwordHash: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  mail: {
    type: DataTypes.TEXT,
    allowNull: false
  }
})

sequelize.sync()

module.exports = Usuario
