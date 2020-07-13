import express from 'express';
const router = express.Router();

router.get('/users', (req,res)=>{

    res.send({users:
        [
            {
                username:'waleed',
                password:'WalPass',
                id:'0'
            },{
                username:'David',
                password:'DavPass',
                id:'1'
            },{
                username:'Moe  ',
                password:'MoePass',
                id:'2'
            }
        ]
    });
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