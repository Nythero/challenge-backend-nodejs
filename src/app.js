const express = require('express')
const app = express()
const authController = require('./controllers/auth')
const personajesController = require('./controllers/personajes')
const tokenExtractor = require('./middlewares/tokenExtractor')
const userExtractor = require('./middlewares/userExtractor')
const handleErrors = require('./middlewares/handleErrors')

app.use(express.json())

app.use('/auth', authController)
app.use(tokenExtractor)
app.use(userExtractor)
app.use('/characters', personajesController)
app.use(handleErrors)

module.exports = app
