const express = require('express')
const exphdbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const routes = require('./routes')
require('./config/mongoose')
const app = express()
const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || '127.0.0.1'
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

//使用路由
app.use(routes)

//伺服器監聽
app.listen(PORT, HOST, () => {
	console.log(`The Server is running on http://${HOST}:${PORT}`)
})
