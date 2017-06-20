const db = require('./index.js')
const User = require('./models/user.js')

const seedUsers = () => db.Promise.map([
  {name: 'Test User', email: 'test@example.com', isMember: false, isAdmin: false},
  {name: 'Test Member', email: 'member@example.com', isMember: true, isAdmin: false},
  {name: 'Test Admin', email: 'admin@example.com', isMember: true, isAdmin: true}
], user => User.create(user))

db.sync({ force: true })
  .then(seedUsers)
  .then(users => console.log(`Seeded ${users.length} Users OK`))
.catch(error => console.error(error))
.finally(() => db.close())
