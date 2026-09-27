const jwt = require('jsonwebtoken')
const CP = require('cookie-parser')
const User = require('../models/UserSchema')

const authVerfied = (req, res, next) => {
  const token = req.cookies.token
  if(token) {
    jwt.verify(token, 'the secret', (err, decodedToken) => {
      if(err) {
        console.log(err)
        return res.redirect('/login')
      } else {
        console.log(decodedToken)
        next();
      }
    })
  } else {
    res.redirect('/login')
  }
}

const chekUser = async (req, res, next) => {
  const token = req.cookies.token

  if(token) {
    jwt.verify(token, 'the secret', async (err, decodedToken) => {
      if(err) {
        console.log(err)
        res.locals.user = null;
        res.redirect('/login')
        next();
      } else {
        const user = await User.findById(decodedToken.id)
        req.user = user;
        res.locals.user = user;
        next()
      }
    })
  } else {
    res.locals.user = null;
    next();
  }
}

module.exports = { authVerfied, chekUser}