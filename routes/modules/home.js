const express = require('express')
const Todo = require('../../models/todo')
const router = express.Router()

//主畫面路由
router.get('/', (req, res) => {
	Todo.find() //取出Todo Model Data
		.lean() //轉變格式為Javascript Object
		.sort('_id') //升冪:直接傳入要排序的項目 降冪: 前面加-  EX: -_id
		.then((todos) => res.render('home', { todos })) //將資料傳入樣板
		.catch((error) => console.error(error)) //handling error
})

module.exports = router
