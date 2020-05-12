const express = require('express')
const exphdbs = require('express-handlebars')
const mongoose = require('mongoose')
const Todo = require('./models/todo')
const app = express()
const port = 3000

//connect mongodb
mongoose.connect('mongodb://localhost/todo-list', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
//取得資料庫連線狀態
const db = mongoose.connection
//連線異常
db.on('error', () => {
	console.log('mongodb error!')
})
//連線成功
db.once('open', () => {
	console.log('mongodb connected!')
})

//模板引擎參數設定
app.engine(
	'handlebars',
	exphdbs({ defaultLayout: 'main', extname: 'handlebars' }) //可以縮寫，但目前不使用
)
//模板啟用
app.set('view engine', 'handlebars')

//主畫面路由
app.get('/', (req, res) => {
	Todo.find()
		.lean()
		.then((todos) => res.render('home', { todos }))
		.catch((error) => console.error(error))
})

//伺服器監聽
app.listen(port, () => {
	console.log(`The Server is running on http://127.0.0.1:${port}`)
})
