const express = require('express')
const peliculasOSeriesController = express.Router({
  strict: true
})
const PeliculaOSerie = require('../models/PeliculaOSerie')
const peliculaOSerieDto = require('../dtos/peliculaOSerie')

const peliculaOSerieFilterExtractor = (req, res, next) => {
  const query = req.query
  const nameQuery = query.name?
    { titulo: query.name } :
    {}
  const genreQuery = query.genre?
    { '$generos.id$': query.genre } :
    {}
  //Esto es necesario ya que en la documentación de Sequelize
  //Dice que el primer elemento de la lista esta escapado
  //pero el segundo no
  const order = (query.order==='DESC')? 'DESC' : 'ASC'
  const orderQuery = query.order?
    { order: [['fechaCreacion', order]] } :
    {}
  req.options = {
    where: {
      ...nameQuery,
      ...genreQuery
    },
    ...orderQuery
  }
  next()
}

peliculasOSeriesController.get('/:id',
  async (req, res,next) => {
  const id = req.params.id
  try {
    const peliculaOSerie = await PeliculaOSerie.get(id)
    if(!peliculaOSerie)
      return res.status(404).json({ error: 'movie not found' })
    res.status(200).json(peliculaOSerie)
  }
  catch(err) {
    next(err)
  }
})

peliculasOSeriesController.get('/',
  peliculaOSerieFilterExtractor,
  async (req, res, next) => {
    const options = req.options
    try {
      const peliculasOSeries = await PeliculaOSerie.findAll({
        attributes: ['imagen', 'titulo', 'fechaCreacion', 'id'],
        ...options
      })
      res.status(200).json(peliculasOSeries)
    }
    catch(err) {
      next(err)
    }
  }
)

peliculasOSeriesController.post('/', async (req, res, next) => {
  const peliculaOSerieData = {
    imagen: req.body.imagen,
    titulo: req.body.titulo,
    fechaCreacion: req.body.fechaCreacion,
    calificacion: req.body.calificacion,
    personajes: req.body.personajes
  }
  try {
    const peliculaOSerie = await PeliculaOSerie.create(peliculaOSerieData)
    res.status(201).json(peliculaOSerie)
  }
  catch(err) {
    next(err)
  }
})

peliculasOSeriesController.delete('/:id', async (req, res, next) => {
  const id = req.params.id
  try {
    await PeliculaOSerie.destroy(id)
    res.status(204).end()
  }
  catch(err) {
    next(err)
  }
})

peliculasOSeriesController.put('/:id', async (req, res, next) => {
  const id = req.params.id
  const peliculaOSerieData = {
    imagen: req.body.imagen,
    titulo: req.body.titulo,
    fechaCreacion: req.body.fechaCreacion,
    calificacion: req.body.calificacion,
    personajes: req.body.personajes
  }
  try {
    await PeliculaOSerie.update(peliculaOSerieData, id)
    res.status(204).end()
  }
  catch(err) {
    next(err)
  }
})

module.exports = peliculasOSeriesController
