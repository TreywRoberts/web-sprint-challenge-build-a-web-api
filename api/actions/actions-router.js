// Write your "actions" router here!
const express = require('express');
const router = express.Router();
const Actions = require('./actions-model');


router.get('/', (req, res, next)=>{
    Actions.get()
        .then(actions=>{
            res.status(200).json(actions)
        })
        .catch(next)
})

router.get('/:id', (req, res, next)=>{
    Actions.get(req.params.id)
        .then(action=>{
            if(action){
                res.status(200).json(action)
            } else {
                res.status(400).json({message: 'this is not the id your looking for'})
            }
        })
})

router.post('/', (req,res,next)=>{
    Actions.insert()
        .then(newAction=>{
            console.log(newAction)
        })
})
module.exports = router