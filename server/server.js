const path = require('path')
const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const session = require('express-session')
const db = require('../db')
const User = require('../db/models/user.js')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const dbStore = new SequelizeStore({ db: db })
const passport = require('passport')
// Sync to create session table
dbStore.sync()
// Sync the database and then run the server
db.sync()
  .then(() => require('./server'))

app.use(express.static(path.join(__dirname, '../public')))
app.use(express.static(path.join(__dirname, '../build')))

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api', require('./apiRoutes'))

app.use(session({
  secret: process.env.SESSION_SECRET || 'a wildly insecure secret',
  store: dbStore,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
passport.serializeUser((user, done) => {
  try {
    done(null, user.id)
  } catch (err) {
    done(err)
  }
})
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => done(null, user))
    .catch(done)
})

app.get('*', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

app.listen(3000, function(){
  console.log('Listening for requests on port 3000...')
})

app.use(function(err, req, res, next){
  console.error(err)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal Server Error')
})

