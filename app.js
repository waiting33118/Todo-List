const express = require('express')
const exphdbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
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

//覆寫前端Method
app.use(methodOverride('_method'))

//主畫面路由
app.get('/', (req, res) => {
	Todo.find() //取出Todo Model Data
		.lean() //轉變格式為Javascript Object
		.sort('_id') //升冪:直接傳入要排序的項目 降冪: 前面加-  EX: -_id
		.then((todos) => res.render('home', { todos })) //將資料傳入樣板
		.catch((error) => console.error(error)) //handling error
})

//新增todo頁面
app.get('/todos/new', (req, res) => {
	res.render('new')
})

//進入單一詳細資料項目
app.get('/todos/:_id', (req, res) => {
	const id = req.params._id
	Todo.findById(id)
		.lean()
		.then((todo) => res.render('detail', { todo }))
		.catch((error) => console.error(error))
})

//進入單一修改項目頁面
app.get('/todos/:_id/edit', (req, res) => {
	const id = req.params._id
	Todo.findById(id)
		.lean()
		.then((todo) => {
			res.render('edit', { todo })
		})
		.catch((error) => console.error(error))
})

//新增TODO
app.post('/todos', (req, res) => {
	const formData = req.body.name
	Todo.create({ name: formData })
		.then(() => {
			res.redirect('/')
		})
		.catch((error) => console.error(error))
})

//修改TODO
app.put('/todos/:_id', (req, res) => {
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

//刪除TODO
app.delete('/todos/:_id', (req, res) => {
	const id = req.params._id
	Todo.findById(id)
		.then((todo) => todo.remove())
		.then(res.redirect('/'))
		.catch((error) => console.error(error))
})

//伺服器監聽
app.listen(port, () => {
	console.log(`The Server is running on http://127.0.0.1:${port}`)
})
