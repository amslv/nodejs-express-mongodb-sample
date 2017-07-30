var express = require('express');
var bodyparser = require('body-parser');
var morgan = require('morgan');
var app = express();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/records', {
    useMongoClient: true
});

app.use(morgan('dev'));
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

var record = require('./models/records.model');
var recordRoutes = require('./models/records.model');

app.use('./records', recordRoutes);

app.listen(3000);