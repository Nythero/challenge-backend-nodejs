const Usuario = require('../models/Usuario')

const findUser = async (req, res, next) => {
  const { username } = req.body
  try {
    const user = await Usuario.findOne({
      where: {
        username
      }
    })
    req.user = user
    next()
  }
  catch (err) {
    next(err)
  }
}

module.exports = findUser
