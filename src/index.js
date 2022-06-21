const app = require('./app.js')
const { PORT } = require('./utils/config')
const sequelize = require('./utils/database')

const testDatabaseConnection = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connection to database has been established successfully')
  }
  catch (err) {
    console.error('Unable to connect to the database: ', err)
  }
}

const init = async () => {
  await testDatabaseConnection()
  app.listen(PORT, () => console.log(`Server running at port: ${PORT}`))
}

init()
