const { DataTypes } = require('sequelize')
const sequelize = require('../utils/database')
const PeliculaOSerie = require('../models/PeliculaOSerie')

const Personaje = sequelize.define('personaje', {
  imagen: DataTypes.TEXT,
  nombre: DataTypes.TEXT,
  edad: DataTypes.INTEGER,
  peso: DataTypes.INTEGER,
  historia: DataTypes.TEXT
})

sequelize.sync()

Personaje.belongsToMany(PeliculaOSerie,
  {
    through: 'Personaje_Aparece_PeliculaOSerie',
    foreingKey: 'PersonajeId'
  }
)

PeliculaOSerie.belongsToMany(Personaje,
  {
    through: 'Personaje_Aparece_PeliculaOSerie',
    foreignKey: 'PeliculaOSerieId'
  }
)

sequelize.sync()

module.exports = Personaje
