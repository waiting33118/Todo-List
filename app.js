const express = require('express')
const exphdbs = require('express-handlebars')
const bodyParser = require('body-parser')
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
//設定bodyParser 參數
app.use(bodyParser.urlencoded({ extended: true }))

//主畫面路由
app.get('/', (req, res) => {
	Todo.find() //取出Todo Model Data
		.lean() //轉變格式為Javascript Object
		.then((todos) => res.render('home', { todos })) //將資料傳入樣板
		.catch((error) => console.error(error)) //handling error
})

//新增todo路由
app.get('/todos/new', (req, res) => {
	res.render('new')
})

//提交表單
app.post('/todos', (req, res) => {
	const formData = req.body.name
	Todo.create({ name: formData })
		.then(() => {
			res.redirect('/')
		})
		.catch((error) => console.error(error))
})

//伺服器監聽
app.listen(port, () => {
	console.log(`The Server is running on http://127.0.0.1:${port}`)
})
