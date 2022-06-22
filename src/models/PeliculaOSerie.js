const { DataTypes } = require('sequelize')
const sequelize = require('../utils/database')
const peliculaOSerieDto = require('../dtos/peliculaOSerie')
const { Genero } = require('./Genero')

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

PeliculaOSerie.belongsToMany(Genero, {
  through: 'PeliculaOSerie_Tiene_Genero',
  foreignKey: 'PeliculaOSerieId'
})

Genero.belongsToMany(PeliculaOSerie, {
  through: 'PeliculaOSerie_Tiene_Genero',
  foreignKey: 'GeneroId'
})

const findAll = async (options) => {
  const os = {
    ...options,
    include: [{
      model: Genero,
      attributes: [],
      through: {
	attributes: []
      }
    }]
  }
  return await PeliculaOSerie.findAll(os)
}

const create = async ({ personajes, ...peliculaOSerieData }) => {
  const peliculaOSerie = await PeliculaOSerie.create(peliculaOSerieData)
  if (personajes)
    await peliculaOSerie.addPersonajes(personajes)
  const ps = await peliculaOSerie.getPersonajes({
    attributes: ['imagen', 'nombre', 'id']
  })
  return peliculaOSerieDto(peliculaOSerie, ps)
}

const get = async (id) => {
  const peliculaOSerie = await PeliculaOSerie.findByPk(id, {
    attributes: ['imagen', 'titulo', 'fechaCreacion', 'calificacion', 'id']
  })
  const p = await PeliculaOSerie.findOne({ where: { id } })
  if(!peliculaOSerie)
    return peliculaOSerie
  const personajes = await peliculaOSerie.getPersonajes({
    attributes: ['imagen', 'nombre', 'id']
  })
  return peliculaOSerieDto(peliculaOSerie, personajes)
}

const destroy = async (id) => {
  await PeliculaOSerie.destroy({
    where: {
      id
    }
  })
}

const update = async (peliculaOSerieData, id) => {
  await PeliculaOSerie.update(peliculaOSerieData, {
    where: {
      id
    }
  })
}

module.exports = {
  findAll,
  create,
  get,
  destroy,
  update,
  PeliculaOSerie
}
