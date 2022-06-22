const express = require('express')
const authController = express.Router()
const { 
  usernameVerifier,
  passwordVerifier,
  mailVerifier
} = require('../utils/verifiers')
const bcrypt = require('bcrypt')
const Usuario = require('../models/Usuario')
const jwt = require('jsonwebtoken')
const { SECRET } = require('../utils/config')
const findUser = require('../utils/findUser')
const sendGridService = require('../services/sendGrid')

authController.post('/login', findUser, async (req, res, next) => {
  const { password } = req.body
  const user = req.user
  
  const isPasswordCorrect = user?
    await bcrypt.compare(password, user.passwordHash) :
    false

  if(!isPasswordCorrect)
    return res.status(401).json({ error: 'invalid username or password' })
  const userForToken = {
    username: user.username,
    id: user.id
  }

  const token = jwt.sign(userForToken, SECRET)
  res.status(200).json({
    token: token,
    username: user.username
  })
})

authController.post('/register',
  usernameVerifier,
  passwordVerifier,
  mailVerifier,
  async (req, res, next) => {
    const { username, password, mail } = req.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const userData = { username, passwordHash, mail }

    try {
      const newUser = await Usuario.create(userData)
      const response = { username: newUser.username, id: newUser.id }
      const msg = sendGridService.welcomingMail(newUser.mail, newUser.username)
      sendGridService.sendMail(msg)
      res.status(201).json(response)
    }
    catch(err) {
      next(err)
    }
})

module.exports = authController
