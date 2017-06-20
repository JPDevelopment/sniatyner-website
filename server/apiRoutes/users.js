const router = require('express').Router()
const User = require('../../db/models/user.js')

router.get('/', function(req, res, next){
  User.findAll()
    .then(users => res.json(users))
    .catch(next)
})

router.post('/', function(req, res, next){
  res.send('POST')
})

router.put('/:userId', function(req, res, next){
  res.send('PUT')
})

router.delete('/:userId', function(req, res, next){
  res.send('DELETE')
})

module.exports = router
