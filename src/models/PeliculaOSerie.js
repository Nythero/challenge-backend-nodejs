const { DataTypes } = require('sequelize')
const sequelize = require('../utils/database')
const peliculaOSerieDto = require('../dtos/peliculaOSerie')

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

const findAll = async (options) => {
  return await PeliculaOSerie.findAll(options)
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
