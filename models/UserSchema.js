const mongoose = require('mongoose')
const { isEmail } = require('validator')
const bycrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, 'please enter an email'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'please enter a valid email'],
  },
  password: {
    type: String,
    required: [true, 'please enter an password'],
    minlength: [6, 'Minimum length password is 6 charecters'],
  }
})


userSchema.pre('save', async function () {
  const salt = await bycrypt.genSalt();

  this.password = await bycrypt.hash(this.password, salt)
})

userSchema.statics.login = async function(email, password) {
  const user = await this.findOne({email})
  if (user) {
    const auth = await bycrypt.compare(password, user.password)
    if (auth) {
      return user
    } throw Error('incorrect password')
  } throw Error('incorrect email')
}

const User = mongoose.model('User', userSchema)

module.exports = User