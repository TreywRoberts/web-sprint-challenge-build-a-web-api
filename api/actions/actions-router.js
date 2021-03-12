// Write your "actions" router here!
const express = require('express');
const {validateActionId, validateActionBody} =require('./../middleware/middleware')
const router = express.Router();
const Actions = require('./actions-model');


router.get('/', (req, res, next)=>{
    Actions.get()
        .then(actions=>{
            res.status(200).json(actions)
        })
        .catch(next)
})

router.get('/:id', validateActionId, (req, res)=>{
   res.status(201).json(req.action)
})

router.post('/', validateActionBody, (req,res,next)=>{
    const newAction = req.body
        Actions.insert(newAction)
            .then(action=>{
                res.status(201).json(action)
            })
            .catch(next)
})
router.put('/:id',validateActionBody, validateActionId, (req, res, next)=>{
    const changes = req.body;
    const { id } = req.params
            Actions.update(id, changes)
                .then(action=>{
                        res.status(200).json(action)
                })
                .catch(next)
})
router.delete('/:id', validateActionId, (req, res, next)=>{
    const {id} = req.params
    Actions.remove(id)
        .then(()=>{
            res.status(200).json({message: 'This action is no longer needed!'})
        })
        .catch(next)
})




module.exports = router