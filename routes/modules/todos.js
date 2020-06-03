const express = require('express')
const Todo = require('../../models/todo')
const router = express.Router()

// 新增todo頁面
router.get('/new', (req, res) => {
  res.render('new')
})

// 進入單一詳細資料項目
router.get('/:_id', (req, res) => {
  const userId = req.user._id
  const _id = req.params._id
  Todo.findOne({ _id, userId })
    .lean()
    .then((todo) => res.render('detail', { todo }))
    .catch((error) => console.error(error))
})

// 進入單一修改項目頁面
router.get('/:_id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params._id
  Todo.findOne({ _id, userId })
    .lean()
    .then((todo) => {
      res.render('edit', { todo })
    })
    .catch((error) => console.error(error))
})

// 新增TODO
router.post('/', (req, res) => {
  const userId = req.user._id
  const name = req.body.name
  Todo.create({ name, userId })
    .then(() => {
      res.redirect('/')
    })
    .catch((error) => console.error(error))
})

// 修改TODO
router.put('/:_id', (req, res) => {
  const userId = req.user._id
  const _id = req.params._id
  const { name, isDone } = req.body
  Todo.findOne({ _id, userId })
    .then((todo) => {
      todo.name = name
      todo.isDone = isDone === 'on'
      todo.save()
    })
    .then(() => res.redirect(`/todos/${_id}`))
    .catch((error) => console.error(error))
})

// 刪除TODO
router.delete('/:_id', (req, res) => {
  const userId = req.user._id
  const _id = req.params._id
  Todo.findOne({ _id, userId })
    .then((todo) => todo.remove())
    .then(res.redirect('/'))
    .catch((error) => console.error(error))
})

module.exports = router
