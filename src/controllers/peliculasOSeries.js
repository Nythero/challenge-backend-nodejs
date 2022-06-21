const express = require('express')
const peliculasOSeriesController = express.Router()
const PeliculaOSerie = require('../models/PeliculaOSerie')
const peliculaOSerieDto = require('../dtos/peliculaOSerie')
const Personaje = require('../models/Personaje')

peliculasOSeriesController.get('/', async (req, res, next) => {
  try {
    const peliculasOSeries = await PeliculaOSerie.findAll({
      attributes: ['imagen', 'titulo', 'fechaCreacion']
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
    const personajes = req.body.personajes
    if (personajes)
      await peliculaOSerie.addPersonajes(personajes)
    const ps = await peliculaOSerie.getPersonajes({
      attributes: ['imagen', 'nombre', 'id']
    })
    res.status(201).json(peliculaOSerieDto(peliculaOSerie, ps))
  }
  catch(err) {
    next(err)
  }
})

module.exports = peliculasOSeriesController
