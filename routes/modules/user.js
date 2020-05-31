const express = require('express')
const router = express.Router()
const User = require('../../models/user')

// 登入介面
router.get('/login', (req, res) => {
  res.render('login')
})

// 接收登入資訊
router.post('/login', (req, res) => {})

// 註冊介面
router.get('/register', (req, res) => {
  res.render('register')
})

// 接收註冊資訊
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body
  User.findOne({ email: email }).then((user) => {
    if (user) {
      console.log('使用者已存在!')
      return res.render('register', {
        name,
        email,
        password,
        password2
      })
    }
    // 使用者建立資料
    const newUser = new User({
      name,
      email,
      password
    })
    newUser
      .save()
      .then(() => res.redirect('/'))
      .catch((err) => console.log(err))
  })
})

// 登出
router.get('/logout', (req, res) => {
  res.send('logout')
})
module.exports = router
