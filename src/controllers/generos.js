const express = require('express')
const generosController = express.Router()
const Genero = require('../models/Genero')

generosController.post('/', async (req, res, next) => {
  const generoData = {
    nombre: req.body.nombre,
    imagen: req.body.imagen,
    peliculasOSeries: req.body.peliculasOSeries
  }
  try {
    const genero = await Genero.create(generoData)
    res.status(201).json(genero)
  }
  catch(err) {
    next(err)
  }
})

module.exports = generosController
