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

export default router;