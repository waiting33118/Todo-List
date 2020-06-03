const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')

module.exports = (app) => {
  // 初始化模組
  app.use(passport.initialize())
  app.use(passport.session())
  // 本地策略
  passport.use(
    new LocalStrategy(
      { usernameField: 'email', passReqToCallback: true },
      (req, email, password, done) => {
        User.findOne({ email })
          .then((user) => {
            if (!user) {
              return done(
                null,
                false,
                req.flash('wrong_msg', '此帳號尚未註冊！')
              )
            }
            if (user.password !== password) {
              return done(null, false, req.flash('wrong_msg', '密碼錯誤'))
            }
            return done(null, user)
          })
          .catch((err) => done(err, false))
      }
    )
  )
  // 序列化&反序列化
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((_id, done) => {
    User.findById({ _id })
      .lean()
      .then((user) => {
        done(null, user)
      })
      .catch((err) => done(err, null))
  })
}
