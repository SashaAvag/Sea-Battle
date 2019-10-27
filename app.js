const express = require('express');
const mongoose = require('mongoose')
const app = express();
require('dotenv/config')
// Routes

app.get('/', (req,res) => {
    res.send('Home page')
});

app.get('/players', (req,res) => {
    res.send('Players page')
});

mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true },
    // { useUnifiedTopology: true },
    () => {console.log('Connected to DB');
    })

//listen port 
app.listen(3000)