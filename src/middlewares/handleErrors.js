const handleErrors = (err, req, res, next) => {
  if(err.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).json({ error: 'username already taken' })
  }
  else {
    console.log(err)
    return res.status(500).json({ error: 'unexpected error' })
  }
}

module.exports = handleErrors
