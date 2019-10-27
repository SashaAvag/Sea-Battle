const express = require('express');
const mongoose = require('mongoose')
const app = express();
require('dotenv/config')

//import routers
const getRoute = require('./routes/gets')

app.use('/', getRoute);

mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true },
    // { useUnifiedTopology: true },
    () => {console.log('Connected to DB');
    })

//listen port 
app.listen(3000)