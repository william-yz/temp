const storage = require('../storage')

storage.saveUser({
  username: 'William Yang',
  password: 'Happy'
})

console.log(storage.findUser({
  username: 'William Yang',
  password: 'Happy'
}))
