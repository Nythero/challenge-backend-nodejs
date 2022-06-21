const express = require('express')
const peliculasOSeriesController = express.Router()
const PeliculaOSerie = require('../models/PeliculaOSerie')

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

module.exports = peliculasOSeriesController
