const express = require('express')
const authController = express.Router()
const { 
  usernameVerifier,
  passwordVerifier
} = require('../utils/verifiers')
const bcrypt = require('bcrypt')
const Usuario = require('../models/Usuario')

authController.post('/login', (req, res, next) => {

})

authController.post('/register', usernameVerifier, passwordVerifier, async (req, res, next) => {
  const { username, password } = req.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const userData = { username, passwordHash }

  try {
    const newUser = await Usuario.create(userData)
    const response = { username: newUser.username }
    res.status(201).json(response)
  }
  catch(err) {
    next(err)
  }
})

module.exports = authController
