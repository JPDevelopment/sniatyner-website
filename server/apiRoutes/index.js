const router = require('express').Router()

router.use('/users', require('./users'))
router.use('/login', require('./login'))
router.use('/signup', require('./signup'))
router.use('/logout', require('./logout'))

router.get('/me', (req, res, next) => {
  res.json(req.user)
})

router.use(function(req, res, next){
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

module.exports = router
