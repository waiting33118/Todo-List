const express = require('express')
const Todo = require('../../models/todo')
const router = express.Router()

// 新增todo頁面
router.get('/new', (req, res) => {
  res.render('new')
})

// 進入單一詳細資料項目
router.get('/:_id', (req, res) => {
  const id = req.params._id
  Todo.findById(id)
    .lean()
    .then((todo) => res.render('detail', { todo }))
    .catch((error) => console.error(error))
})

// 進入單一修改項目頁面
router.get('/:_id/edit', (req, res) => {
  const id = req.params._id
  Todo.findById(id)
    .lean()
    .then((todo) => {
      res.render('edit', { todo })
    })
    .catch((error) => console.error(error))
})

// 新增TODO
router.post('/', (req, res) => {
  const formData = req.body.name
  Todo.create({ name: formData })
    .then(() => {
      res.redirect('/')
    })
    .catch((error) => console.error(error))
})

// 修改TODO
router.put('/:_id', (req, res) => {
  const id = req.params._id
  const { name, isDone } = req.body
  Todo.findById(id)
    .then((todo) => {
      todo.name = name
      todo.isDone = isDone === 'on'
      todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch((error) => console.error(error))
})

// 刪除TODO
router.delete('/:_id', (req, res) => {
  const id = req.params._id
  Todo.findById(id)
    .then((todo) => todo.remove())
    .then(res.redirect('/'))
    .catch((error) => console.error(error))
})

module.exports = router
