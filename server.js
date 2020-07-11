var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var http = require('http').Server(app);
import apiRouter from './api/index';
import mongoose from 'mongoose';
app.use(express.static(__dirname));

app.set('view engine', 'ejs');

//Mongose connection 
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/EtihadDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// bodyparser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var server = http.listen(3001, () => {
    console.log('server is on the ' + server.address().port);
});

app.get('/', (req, res) => {
    res.render('index', {
        content: 'rendered from server'
    });
});

app.use('/api', apiRouter);