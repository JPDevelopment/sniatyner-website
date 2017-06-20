const db = require('./index.js')
const User = require('./models/user.js')

const seedUsers = () => db.Promise.map([
  {name: 'Test User', email: 'test@example.com', isAdmin: false},
  {name: 'Test Admin', email: 'admin@example.com', isAdmin: true}
], user => User.create(user))

db.sync({ force: true })
  .then(() => db.sync())
    .then(seedUsers)
    .then(users => console.log(`Seeded ${users.length} Users OK`))
    .catch(error => console.error(error))
    .finally(() => db.close)
