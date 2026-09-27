const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const noteSchema = new Schema({
  title: {
    type: String,
    required: [true, 'please enter an title to note'],
    maxlength: [50, 'Your title is Soo long'],
    minlength: [2, 'Your title is Soo short'],
    trim: true,
  },
  desc: {
    type: String,
    required: [true, 'please enter an description to note'],
    minlength: [10, 'Your description is Soo short'],
    trim: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {timestamps: true})

const Note = mongoose.model('Note', noteSchema)

module.exports = Note