const { DataTypes } = require('sequelize')
const sequelize = require('../utils/database')

const PeliculaOSerie = sequelize.define(
  'peliculaOSerie',
  {
    imagen: DataTypes.TEXT,
    titulo: DataTypes.TEXT,
    fechaCreacion: DataTypes.DATE,
    calificacion: DataTypes.FLOAT
  }
)

sequelize.sync()

module.exports = PeliculaOSerie
