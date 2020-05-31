const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')

module.exports = (passport) => {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      User.findOne({
        email: email
      }).then((user) => {
        if (!user) {
          return done(null, false, { message: "The email isn't register yet" })
        }
        if (user.password !== password) {
          return done(null, false, { message: 'Email or Password was invalid' })
        }
        return done(null, user)
      })
    })
  )
  // 序列化
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  // 反序列化
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .exec((err, user) => {
        done(err, user)
      })
  })
}
