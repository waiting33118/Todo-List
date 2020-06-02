const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../../models/user')

// 登入介面
router.get('/login', (req, res) => {
  res.render('login')
})

// 接收登入資訊
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login'
  })
)

// 註冊介面
router.get('/register', (req, res) => {
  res.render('register')
})

// 接收註冊資訊
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  User.findOne({ email }).then((user) => {
    if (user) {
      console.log('使用者已存在!')
      return res.render('register', {
        name,
        email,
        password,
        confirmPassword
      })
    }
    // 使用者建立資料
    User.create({ name, email, password })
      .then(() => res.redirect('/'))
      .catch((err) => console.log(err))
  })
})

// 登出並導回登入頁面
router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/users/login')
})
module.exports = router
