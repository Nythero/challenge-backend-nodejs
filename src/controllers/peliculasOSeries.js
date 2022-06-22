const express = require('express')
const peliculasOSeriesController = express.Router()
const PeliculaOSerie = require('../models/PeliculaOSerie')
const peliculaOSerieDto = require('../dtos/peliculaOSerie')

peliculasOSeriesController.get('/:id', async (req, res,next) => {
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

peliculasOSeriesController.get('/', async (req, res, next) => {
  try {
    const peliculasOSeries = await PeliculaOSerie.findAll({
      attributes: ['imagen', 'titulo', 'fechaCreacion', 'id']
    })
    res.status(200).json(peliculasOSeries)
  }
  catch(err) {
    next(err)
  }
})

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
