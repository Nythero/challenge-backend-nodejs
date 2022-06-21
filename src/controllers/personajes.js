const express = require('express')
const personajesController = express.Router()
const Personaje = require('../models/Personaje')

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

module.exports = personajesController
