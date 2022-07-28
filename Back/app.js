require('dotenv').config();
const express = require('express'); 
const cookierParser = require ('cookie-parser');
const app = express(); 
const mongoose = require ('mongoose')
const path = require('path'); 

const userRoutes = require('./routes/user-router'); 
const mainRoutes = require('./routes/mainpage-router'); 

const dbUrl = process.env.DB_URL;

mongoose.connect(dbUrl,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(express.json()); 
app.use(cookierParser());

app.use('/api/auth', userRoutes); 
app.use ('/api/mainpage', mainRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app; 

