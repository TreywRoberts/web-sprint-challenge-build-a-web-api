const Actions = require('./../actions/actions-model');
const Projects = require('./../projects/projects-model');

async function validateActionId(req, res, next) {
    const {id} = req.params
   
try{
    const action = await Actions.get(id)
    if(!action){
        res.status(404).json({message: 'This is not the id you are looking for'})
    } else {
        req.action = action
        next()
    }
} catch(err){
    next(err)
}
}

function validateActionBody(req, res, next){
    if(!req.body.description || !req.body.notes || !req.body.project_id){
        res.status(400).json({message: 'please include description, project_id, and notes'})
    } else {
        next()
    }
} 
async function validateProjectId(req, res, next) {
    const {id} = req.params
   
try{
    const project = await Projects.get(id)
    if(!project){
        res.status(404).json({message: 'This is not the id you are looking for'})
    } else {
        req.project = project
        next()
    }
} catch(err){
    next(err)
}
}

function validateProjectBody(req, res, next){
    if(!req.body.name || !req.body.description){
        res.status(400).json({message: 'Please provide a name and description!'})
    } else {
        next()
    }
}

module.exports = {
    validateActionId,
    validateActionBody,
    validateProjectId, 
    validateProjectBody
}