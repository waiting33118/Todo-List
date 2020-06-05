const express = require('express')
const session = require('express-session')
const exphdbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const flash = require('connect-flash')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const routes = require('./routes')
const usePassport = require('./config/passport')
require('./config/mongoose')
const app = express()
const PORT = process.env.PORT

// 模板引擎參數設定
app.engine(
  'handlebars',
  exphdbs({ defaultLayout: 'main', extname: 'handlebars' }) // 可以縮寫，但目前不使用
)

// 使用express-session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
)

// 模板啟用
app.set('view engine', 'handlebars')

// 設定bodyParser 參數
app.use(bodyParser.urlencoded({ extended: true }))

// 覆寫前端Method
app.use(methodOverride('_method'))

// 使用passport套件
usePassport(app)

// 使用flash訊息套件
app.use(flash())

// 使用req資訊
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  res.locals.wrong_msg = req.flash('wrong_msg')
  next()
})

// 使用路由
app.use(routes)

// 伺服器監聽
app.listen(PORT, () => {
  console.log(`The Server is running on Port:${PORT}`)
})
