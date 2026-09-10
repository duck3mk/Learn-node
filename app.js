// express

const express = require('express');

// express app
const app = express();

// listen for req
app.set('view engine', 'ejs')

app.listen(3000)

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/test', (req, res) => {
  res.render('test')
})

app.get('/test/new', (req, res) => {
  res.render('new')
})
// redircet



// 404

app.use((req, res) => {
  res.status(404).render('404')
})