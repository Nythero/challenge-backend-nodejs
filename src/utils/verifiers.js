const passwordVerifier = (req, res, next) => {
  const password = req.body.password
  if(!password)
    return res.status(400).json({ error: 'password needed' })
  next()
}

const usernameVerifier = (req, res, next) => {
  const username = req.body.username
  if(!username)
    return res.status(400).json({ error: 'username needed' })
  next()
}

const verifiers = {
  passwordVerifier,
  usernameVerifier
}

module.exports = verifiers
