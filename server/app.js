const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());


const filmsRoute = require('./api/restaurants');

app.use('/restaurants', filmsRoute)

mongoose
    .connect(process.env.DB_CONNECTION,{ useUnifiedTopology: true, useNewUrlParser: true }) 
    .then(() => {
        console.log('connect to DB!')
    })
    .catch( err => {
        console.log(`${err.message}`)
    })

app.listen(port, () => { 
    console.log('Server started on port: ' + port);
});