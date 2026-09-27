const { Router } = require('express')
const noteController = require('../controllers/noteController')
const { authVerfied } = require('../middlewere/authMiddlewere')
const route = Router();

route.get('/', authVerfied, noteController.home_get)

route.get('/notes/create',authVerfied, noteController.create_get)

route.post('/notes/create', authVerfied, noteController.create_post)

route.delete('/notes/:id', authVerfied, noteController.note_delete)

route.put('/notes/:id', authVerfied, noteController.note_edit)

module.exports = route;