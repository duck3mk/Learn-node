const express = require('express');
const fs = require('fs')
const mongoose = require('mongoose')
const Note = require('./models/noteSchema')
const noteRoute = require('./routes/noteRoute')
const authRoute = require('./routes/authRoute')
const CP = require('cookie-parser');
const {chekUser} = require('./middlewere/authMiddlewere')


const app = express();

// midilewere
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.static('styles'));
app.use(CP());

const db = 'mongodb://Krar:krar_3mk@ac-qfj9wbm-shard-00-00.stfsgfg.mongodb.net:27017,ac-qfj9wbm-shard-00-01.stfsgfg.mongodb.net:27017,ac-qfj9wbm-shard-00-02.stfsgfg.mongodb.net:27017/Noteapp?ssl=true&replicaSet=atlas-s54n98-shard-0&authSource=admin&appName=Cluster0'

mongoose.connect(db).then(() => {
  app.listen(3000)
  console.log('connect')
}).catch((err) => {
  console.log(err)
})

app.use(chekUser)

// note app mvc
app.use(noteRoute)

// auth mvc 
app.use(authRoute)

//


//err 404 page
app.use((req, res) => {
  res.render('404')
})
