const { DataTypes } = require('sequelize')
const sequelize = require('../utils/database')

const Personaje = sequelize.define('personaje', {
  imagen: DataTypes.TEXT,
  nombre: DataTypes.TEXT,
  edad: DataTypes.INTEGER,
  peso: DataTypes.INTEGER,
  historia: DataTypes.TEXT,
  peliculasOSeries: DataTypes.TEXT
})

sequelize.sync()

module.exports = Personaje
