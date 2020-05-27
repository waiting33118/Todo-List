const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const todos = require('./modules/todos')
const user = require('./modules/user')

router.use('/', home)
router.use('/todos', todos)
router.use('/users', user)

module.exports = router
