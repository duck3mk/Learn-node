const User = require('../models/UserSchema.js');
const CP = require('cookie-parser');
const jwt = require('jsonwebtoken');
// handleErrors
const handleErrors = (err) => {
  console.log(err.message, err.code)
  let errors = {email: '', password: ''}

  if (err.code === 11000) {
    errors.email = 'this email is already regestred'
    console.log(errors)
      return errors;
  }

  if(err.message === 'incorrect email') {
    errors.email = 'incorrect email';
  }

  if(err.message === 'incorrect password') {
    errors.password = 'incorrect password';
  }
  if(err.message.includes('User validation failed')) {
    Object.values(err.errors).forEach(( {properties} ) => {
      errors[properties.path] = properties.message
      console.log(errors)
    })
  }
  return errors;
}

const maxAge = 1000 * 60 * 60 * 24 * 3
const createToken = (id) => {
  return jwt.sign({ id }, 'the secret', {
    expiresIn: maxAge,
  })
}


module.exports.signup_get = (req, res) => {
  res.render('signup')
}

module.exports.login_get = (req, res) => {
  res.render('login')
}

module.exports.signup_post = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.create({email, password})

    const token = createToken(user._id)
    res.cookie('token', token, {
      httpOnly: true,
      maxAge,
    })
    res.status(201).json({user: user._id})
  } catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({ errors })
  }

  
  //console.log(req.body)
}

module.exports.login_post = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.login( email, password)
    const token = createToken(user._id)
    res.cookie('token', token, {
      httpOnly: true,
      maxAge,
    })
    res.status(200).json({ user: user._id})
    //console.log({user: user._id})
  } catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({ errors })
  }

  //console.log(req.body)
}

module.exports.logout_get = (req, res) => {
  res.cookie('token', '', {maxAge: 1 })
  res.redirect('/')
}