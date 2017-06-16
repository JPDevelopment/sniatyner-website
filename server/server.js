const path = require('path')
const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')

app.use(express.static(path.join(__dirname, '../public'))) // Statically serves the 'public' folder

// Any routes or other various middlewares should go here!
app.use(morgan('dev')) // Logging middleware
app.use(bodyParser.json()) // Parsing middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api', require('./apiRoutes')) // Matches all requests to /api

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
