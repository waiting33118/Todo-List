if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')
const todos = require('./todoList.json').todoList
const Todo = require('../todo')
const User = require('../user')
const bcrypt = require('bcryptjs')
const SEED_USER = {
  name: 'root',
  email: 'root@example.com',
  password: '12345678'
}
db.once('open', () => {
  // 建立使用者
  bcrypt
    .genSalt(10)
    .then((salt) => bcrypt.hash(SEED_USER.password, salt))
    .then((hash) => {
      return User.create({
        name: SEED_USER.name,
        email: SEED_USER.email,
        password: hash
      })
    })
    .then((user) => {
      const userId = user._id
      // 建立Todo資料庫
      return Promise.all(
        Array.from(todos, (todo) => Todo.create({ name: todo.name, userId }))
      )
    })
    .catch((err) => console.log(err))
    .then(() => {
      console.log('The Data has been created!')
      process.exit()
    })
})
