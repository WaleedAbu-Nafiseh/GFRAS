import express from 'express';
const router = express.Router();
var dbcon = require('./dbconn');
dbcon.query('SELECT * FROM gfras_db.student;', function (err, result, fields) {
    if (err) throw err;
    console.log(result);
});

router.get('/users', (req,res)=>{

    res.send(

    );
});

router.get('/users/:userID', (req,res)=>{
    var user;
    if(req.params.userID=='0'){
        user={
            username:'waleed',
            password:'WalPass',
            id:'0'
        };
    }else if(req.params.userID=='1'){
        user={
            username:'David',
            password:'DavPass',
            id:'1'
        };
    }else{
        user={
            username:'Moe  ',
            password:'MoePass',
            id:'2'
        };
    }
    res.send( user);
});
export default router;