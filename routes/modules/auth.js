const express = require('express')
const router = express.Router()
const passport = require('passport')

// 向Facebook發出請求
router.get(
  '/facebook',
  passport.authenticate('facebook', {
    scope: ['email', 'public_profile']
  })
)
// Facebook回傳資料
router.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/users/login'
  })
)
module.exports = router
