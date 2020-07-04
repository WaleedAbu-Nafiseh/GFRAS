var express = require('express');
var bodyParser= require('body-parser');
var app = express();
var path=require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose=require('mongoose')
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

var server= http.listen(3000,()=>{
    console.log('server is on the '+server.address().port);
   });

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'./login/login.html'));
});
