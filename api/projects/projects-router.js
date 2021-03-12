// Write your "projects" router here!
const { json } = require('express');
const express = require('express');
const {validateProjectId, validateProjectBody} = require('./../middleware/middleware')
const router = express.Router();
const Projects = require('./projects-model');

router.get('/', (req, res, next)=>{
    Projects.get()
        .then(projects=>{
            res.status(200).json(projects)
        })
        .catch(next)
})

router.get('/:id', validateProjectId, (req, res)=>{
    res.status(201).json(req.project)
})
router.post('/', validateProjectBody, (req, res, next)=>{
    const newProject = req.body
    Projects.insert(newProject)
        .then(project=>{
            res.status(201).json(project)
        })
        .catch(next)
})
router.put('/:id', validateProjectBody, validateProjectId, (req, res, next)=>{
    const {id} = req.params
    const updatedProject = req.body
    Projects.update(id, updatedProject)
        .then(project=>{
            res.status(200).json(project)
        })
        .catch(next)
})
router.delete('/:id', validateProjectId, (req, res, next)=>{
    const {id}= req.params
    Projects.remove(id)
        .then(()=>{
            res.status(200).json({message: 'This project is no longer needed'})
        })
        .catch(next)
})
router.get('/:id/actions', validateProjectId, (req, res, next)=>{
    const {id} = req.params
    Projects.getProjectActions(id)
        .then(project=>{
            res.status(200).json(project)
        })
        .catch(next)
})

module.exports = router