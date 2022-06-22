const express = require('express')
const personajesController = express.Router()
const Personaje = require('../models/Personaje')
const personajeDto = require('../dtos/personajes')

const personajeFilterExtractor = (req, res, next) => {
  const query = req.query
  const nameQuery = query.name?
    { nombre: query.name } : 
    {}
  const ageQuery = query.age?
    { edad: query.age } :
    {}
  const movieQuery = query.movies?
    { '$peliculaOSeries.id$': query.movies } :
    {}
  const filters = {
    ...nameQuery,
    ...ageQuery,
    ...movieQuery
  }
  req.filters = filters
  next()
}

personajesController.get('/', 
  personajeFilterExtractor,
  async (req, res, next) => {
  try {
    const personajes = await Personaje.findAll({
      attributes: ['imagen', 'nombre', 'id'],
      where: req.filters
    })
    res.status(200).json(personajes)
  }
  catch(err) {
    next(err)
  }
})

personajesController.get('/:id', async (req, res, next) => {
  const id = req.params.id
  try {
    const personaje = await Personaje.get(id)
    if(!personaje)
      return res.status(404).json({ error: "character not found" })
    res.status(200).json(personaje)
  }
  catch(err) {
    next(err)
  }
})

personajesController.post('/', async (req, res, next) => {
  const personajeData = {
    imagen: req.body.imagen,
    nombre: req.body.nombre,
    edad: req.body.edad,
    peso: req.body.peso,
    historia: req.body.historia,
    peliculasOSeries: req.body.peliculasOSeries
  }
  try {
    const newPersonaje = await Personaje.create(personajeData)
    res.status(201).json(newPersonaje)
  }
  catch(err) {
    next(err)
  }
})

personajesController.delete('/:id', async (req, res, next) => {
  const id = req.params.id
  try {
    await Personaje.destroy(id)
    res.status(204).end()
  }
  catch(err) {
    next(err)
  }
})

personajesController.put('/:id', async (req, res, next) => {
  const id = req.params.id
  const personajeData = {
    imagen: req.body.imagen,
    nombre: req.body.nombre,
    edad: req.body.edad,
    peso: req.body.peso,
    historia: req.body.historia
  }
  try {
    await Personaje.update(personajeData, id)
    res.status(204).end()
  }
  catch(err) {
    next(err)
  }
})

module.exports = personajesController
