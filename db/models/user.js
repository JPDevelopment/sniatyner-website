const crypto = require('crypto')
const _ = require('lodash')
const Sequelize = require('sequelize')
const db = require('../index.js')

const User = db.define('user', {
  name: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true,
      notEmpty: true
    },
    unique: true
  },
  isMember: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  password: {
    type: Sequelize.STRING
  },
  salt: {
    type: Sequelize.STRING
  }
})

function setSaltAndPassword(user){
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password, user.salt)
  }
}

Object.assign(User.prototype, {
  sanitize: function () {
    return _.omit(this.toJSON(), ['password', 'salt']);
  },
  correctPassword: function (candidatePassword) {
    return User.encryptPassword(candidatePassword, this.salt) === this.password;
  }
})

User.generateSalt = function () {
  return crypto.randomBytes(16).toString('base64')
}

User.encryptPassword = function (plainText, salt) {
  const hash = crypto.createHash('sha1')
  hash.update(plainText);
  hash.update(salt);
  return hash.digest('hex')
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)

module.exports = User
