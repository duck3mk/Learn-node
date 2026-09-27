const Note = require('../models/noteSchema')


const handleErrors = (err) => {
  console.log(err.message, err.code)
  let errors = {title: '', desc: ''}

  if (err.message.includes('Note validation failed')) {
    Object.values(err.errors).forEach(({properties}) => {
      //console.log(err.errors)
      errors[properties.path] = properties.message
    })
    //console.log(Object.values(err.errors))
  }
  if (err.name === 'Validation failed') {
    Object.values(err.errors).forEach(({properties}) => {
      errors[properties.path] = properties.message
    })
  }
  return errors;
}

module.exports.home_get = async (req, res) => {

  const notes = await Note.find({ user: req.user._id})
  console.log(notes)
  res.render('home', {notes})
}

module.exports.create_get = (req, res) => {
  res.render('create')
}

module.exports.create_post = async (req, res) => {
  const {title, desc} = req.body

  try {
    const note = await Note.create({title, desc, user: req.user._id})
    console.log(req.body)
    res.status(200).json({note})
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors })
  }
}

module.exports.note_delete = async (req, res) => {
  try {
    const id = req.params.id
    const note = await Note.findById(id)
    if (note.user.equals(req.user._id)) {
      const deleteNote = await Note.findByIdAndDelete(id)
      res.status(200).json({ msg: 'Delete Done'})
    } else {
      res.status(403).json({ msg: 'Field delete'})
    }
  } catch (err) {
    console.log(err)
    res.status(400).json(err)
  }
}

module.exports.note_edit = async (req, res) => {
  const {title, desc} = req.body
  try {
    const id = req.params.id;
    const note = await Note.findById(id)
    if (note.user.equals(req.user._id)) {
      const editNote = await Note.findByIdAndUpdate(id, {title, desc}, {runValidators: true})
      res.status(200).json({ msg: 'edit Done'})
    }
  } catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({errors})
  }
}