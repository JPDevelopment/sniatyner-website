const router = require('express').Router()

router.get('/', function(req, res, next){
  res.send('GET')
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
