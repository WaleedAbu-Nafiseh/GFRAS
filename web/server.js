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
var dburl='mongodb+srv://user:user@cluster0.h9dla.mongodb.net/<dbname>?retryWrites=true&w=majority'
var messages=[];

app.get('/messages',(req,res)=>{
    res.send(messages);
});
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'./login/login.html'));
});
app.post('/messages',(req,res)=>{
    console.log(req.body)
    messages.push(req.body)
    io.emit('message',req.body);

    res.sendStatus(200);
});
var server= http.listen(3000,()=>{
 console.log('server is on the '+server.address().port);
});
io.on('connecion',(socket)=>{
    console.log("User connected")
});