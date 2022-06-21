const jwt = require('jsonwebtoken')
const { SECRET } = require('../utils/config')
const Usuario = require('../models/Usuario')

const userExtractor = async (req, res, next) => {
  const token = req.token
  let decodedToken
  try {
    decodedToken = jwt.verify(token, SECRET)
  } 
  catch(err) {
    if(err.message === 'jwt must be provided' ||
      err.message === 'jwt malformed' ||
      err.message === 'invalid token')
      return res.status(401).json({ error: 'token missing or invalid' })
    else
      return next(err)
  }
  const attributes = ['username', 'passwordHash']
  req.user = await Usuario.findOne({
    where: {
      id: decodedToken.id
    },
    attributes
  })
  if(req.user === null)
    return res.status(401).json({ error: 'token missing or invalid' })

  next()
}

module.exports = userExtractor
