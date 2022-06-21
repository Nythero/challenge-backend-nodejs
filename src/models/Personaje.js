const { DataTypes } = require('sequelize')
const sequelize = require('../utils/database')
const PeliculaOSerie = require('../models/PeliculaOSerie')
const personajeDto = require('../dtos/personajes')

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

const create = async ({ peliculasOSeries, ...personajeData }) => {
  const newPersonaje = await Personaje.create(personajeData)
  if(peliculasOSeries)
    await newPersonaje.addPeliculaOSeries(peliculasOSeries)
  const ps = await newPersonaje.getPeliculaOSeries({
    attributes: ['imagen', 'titulo', 'fechaCreacion', 'id']
  })
  return personajeDto(newPersonaje, ps)
}

const destroy = async (id) => {
  await Personaje.destroy({
    where : {
      id
    }
  })
}

const update = async (personajeData, id) => {
  await Personaje.update(personajeData, {
    where: {
      id
    }
  })
}

const get = async (id) => {
  const attributes = ['imagen', 'nombre', 'edad',
    'peso', 'historia', 'id']
  const personaje = await Personaje.findByPk(
    id,
    {
      attributes
    }
  )
  if(!personaje)
    return personaje
  const peliculasOSeries = await personaje.getPeliculaOSeries(
    {
      attributes: ['imagen', 'titulo', 'fechaCreacion', 'id']
    }
  )
  return personajeDto(personaje, peliculasOSeries)
}

const findAll = async (options) => {
  return await Personaje.findAll(options)
}

module.exports = {
  create,
  destroy,
  get,
  update,
  findAll
}
