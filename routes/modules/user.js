const express = require('express')
const router = express.Router()

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
router.post('/register', (req, res) => {})

// 登出
router.get('/logout', (req, res) => {})
module.exports = router
