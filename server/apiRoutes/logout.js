const router = require('express').Router()
const User = require('../../db/models/user.js')

router.post('/logout', (req, res, next) => {
  req.logout()
  res.sendStatus(200)
})

module.exports = router

