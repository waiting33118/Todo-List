const db = require('../../config/mongoose')
const todos = require('./todoList.json')
const Todo = require('../todo')

db.once('open', () => {
  todos.todoList.forEach((todo) => {
    Todo.create(todo).catch((err) => console.log(err))
  })
  console.log('The data has been created!')
})
