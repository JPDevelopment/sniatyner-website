const router = require('express').Router()
const User = require('../../db/models/user.js')

router.post('/', (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user){
        res.status(401).send('User Not Found')
      }
      else if (!user.correctPassword(req.body.password)){
        res.status(401).send('Incorrect Password')
      } else {
        req.login(user, err => {
          if (err) next(err);
          else res.json(user);
        })
      }
    })
    .catch(next);
})

module.exports = router

