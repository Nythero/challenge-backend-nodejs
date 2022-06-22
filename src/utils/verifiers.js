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

const mailVerifier = (req, res, next) => {
  const mail = req.body.mail
  if(!mail)
    return res.status(400).json({ error: 'mail needed' })
  next()
}

const verifiers = {
  passwordVerifier,
  usernameVerifier,
  mailVerifier
}

module.exports = verifiers
