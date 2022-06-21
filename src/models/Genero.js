const { DataTypes } = require('sequelize')
const sequelize = require('../utils/database')

const Genero = sequelize.define({
  nombre: DataTypes.TEXT,
  imagen: DataTypes.TEXT,
  peliculasOSeries: DataTypes.TEXT
})

sequelize.sync()

module.exports = Genero
