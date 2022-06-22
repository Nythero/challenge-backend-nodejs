const sgMail = require('@sendgrid/mail')
const { SENDGRID_API_KEY, SENDGRID_SENDER } = require('../utils/config')
sgMail.setApiKey(SENDGRID_API_KEY)

const sendMail = async (msg) => {
  try {
    await sgMail.send(msg)
    console.log('Email Sent')
  }
  catch(err) {
    console.log(err)
  }
}

const welcomingMail = (userMail, username) => ({
  to: userMail,
  from: SENDGRID_SENDER,
  subject: `Welcome ${username}`,
  text: 'Thanks for using our Api.'
})

module.exports = {
  sendMail,
  welcomingMail
}
