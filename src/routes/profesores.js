const { Router } = require('express');
const router = Router();
const _ = require('underscore');
const profesores = [];
var profesoresIndex = profesores.length;

router.get('/profesores', (req, res) =>{
    res.json(profesores);
});

router.get('/profesores/:id', (req, res) =>{
    const { id } = req.params;
    for(var i = 0; i<profesores.length; i++){
        if(profesores[i].id == id){
            res.json(profesores[i]);
            return;
        }
    }
    res.status(404).json({error: 'Student not found'});
});

router.post('/profesores', (req, res) =>{
    const { numeroEmpleado, nombres, apellidos, horasClase} = req.body;
    if(numeroEmpleado && nombres && apellidos && horasClase){
        profesoresIndex += 1;
        const id = profesoresIndex;
        const newProfesor = {id, ...req.body};
        profesores.push(newProfesor);
        res.status(201).json(profesores);
    }else{
        res.status(404).json({error: 'There was an error'});
    }
});

router.put('/profesores/:id', (req, res) =>{
    const { id } = req.params;
    const { numeroEmpleado, nombres, apellidos, horasClase} = req.body;
    if(numeroEmpleado && nombres && apellidos && horasClase){
        for(var i = 0; i<profesores.length; i++){
            if(profesores[i].id == id){
                profesores[i].nombres = nombres;
                profesores[i].apellidos = apellidos;
                profesores[i].matricula = matricula;
                profesores[i].promedio = promedio;
                res.status(201).json({msg: 'Student updated'});
                return;
            }
        }
        res.status(404).json({error: 'Student not found'});
    }else{
        res.status(400).json({error: 'There was an error'});
    }
});

router.delete('/profesores/:id', (req, res) =>{
    const { id } = req.params;
    for(var i = 0; i<profesores.length; i++){
        if(profesores[i].id == id){
            profesores.splice(i, 1);
            res.json({msg: 'Student deleted'});
            return;
        }
    }
    res.status(404).json({error : 'Student not found'});
});

module.exports = router;