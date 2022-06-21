const { DataTypes } = require('sequelize')
const sequelize = require('../utils/database')

const Aparece = (Personaje, PeliculaOSerie) => {
  const A = sequelize.define(
    'Personaje_Aparece_PeliculaOSerie',
    {
      PersonajeId: {
        type: DataTypes.INTEGER,
        references: {
          model: Personaje,
          key: id
        }
      },
      PeliculaOSerieId: {
        type: DataTypes.INTEGER,
        references: {
          model: PeliculaOSerie,
          key: id
        }
      }
    }
  )
  sequelize.sync()
  return A
}


module.exports = Aparece
