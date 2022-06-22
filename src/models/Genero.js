const { DataTypes } = require('sequelize')
const sequelize = require('../utils/database')
const generoDto = require('../dtos/generos')

const Genero = sequelize.define('genero', {
  nombre: DataTypes.TEXT,
  imagen: DataTypes.TEXT
})

sequelize.sync()

const create = async ({ peliculasOSeries, ...generoData }) => {
  const genero = await Genero.create(generoData)
  if(peliculasOSeries)
    await genero.addPeliculaOSeries(peliculasOSeries)
  return generoDto(genero)
}

module.exports = {
  create,
  Genero
}
