const express = require('express')
const personajesController = express.Router()
const Personaje = require('../models/Personaje')
const personajeDto = require('../dtos/personajes')

personajesController.get('/', async (req, res, next) => {
  try {
    const personajes = await Personaje.findAll({
      attributes: ['imagen', 'nombre']
    })
    res.status(200).json(personajes)
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
    const response = personajeDto(newPersonaje)
    res.status(201).json(response)
  }
  catch(err) {
    next(err)
  }
})

personajesController.delete('/:id', async (req, res, next) => {
  const id = req.params.id
  try {
    await Personaje.destroy({
      where : {
        id
      }
    })
    res.status(204).end()
  }
  catch(err) {
    next(err)
  }
})

personajesController.put('/:id', async (req, res, next) => {
  const id = req.params.id
  console.log(id)
  const personajeData = {
    imagen: req.body.imagen,
    nombre: req.body.nombre,
    edad: req.body.edad,
    peso: req.body.peso,
    historia: req.body.historia,
    peliculasOSeries: req.body.peliculasOSeries
  }
  try {
    const newPersonaje = await Personaje.update(personajeData, {
      where: {
	id
      }
    })
    console.log(newPersonaje)
    res.status(200).json(personajeDto(newPersonaje))
  }
  catch(err) {
    next(err)
  }
})

module.exports = personajesController
