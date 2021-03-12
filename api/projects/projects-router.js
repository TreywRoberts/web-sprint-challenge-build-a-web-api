// Write your "projects" router here!
const express = require('express');
const router = express.Router();
const Projects = require('./projects-model');

router.get('/', (req, res, next)=>{
    Projects.get()
        .then(projects=>{
            res.status(200).json(projects)
        })
        .catch(next)
})

module.exports = router