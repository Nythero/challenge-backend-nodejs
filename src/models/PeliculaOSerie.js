const { DataTypes } = require('sequelize')
const sequelize = require('../utils/database')

const PeliculaOSerie = sequelize.define({
  imagen: DataTypes.TEXT,
  titulo: DataTypes.TEXT,
  fechaCreacion: DataTypes.DATE,
  calificacion: DataTypes.FLOAT,
  personajes: DataTypes.TEXT
})

sequelize.sync()

module.exports = PeliculaOSerie
