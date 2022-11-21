const { Router } = require('express');
const router = Router();
const _ = require('underscore');
const alumnos = require('../sample.json');
var alumnosIndex = alumnos.length;

router.get('/alumnos', (req, res) =>{
    res.json(alumnos);
});

router.get('/alumnos/:id', (req, res) =>{
    const { id } = req.params;
    for(var i = 0; i<alumnos.length; i++){
        if(alumnos[i].id == id){
            res.json(alumnos[i]);
            return;
        }
    }
    res.status(404).json({error: 'Student not found'});
});

router.post('/alumnos', (req, res) =>{
    const { nombres, apellidos, matricula, promedio} = req.body;
    if(nombres && apellidos && matricula && promedio){
        alumnosIndex += 1;
        const id = alumnosIndex;
        const newAlumno = {id, ...req.body};
        alumnos.push(newAlumno);
        res.status(201).json(alumnos);
    }else{
        res.status(400).json({error: 'Invalid request'});
    }
});

router.put('/alumnos/:id', (req, res) =>{
    const { id } = req.params;
    const { nombres, apellidos, matricula, promedio} = req.body;
    if(nombres && apellidos && matricula && promedio){
        for(var i = 0; i<alumnos.length; i++){
            if(alumnos[i].id == id){
                alumnos[i].nombres = nombres;
                alumnos[i].apellidos = apellidos;
                alumnos[i].matricula = matricula;
                alumnos[i].promedio = promedio;
                res.status(201).json({msg: 'Student updated'});
                return;
            }
        }
        res.status(404).json({error: 'Student not found'});
    }else{
        res.status(400).json({error: 'There was an error'});
    }
});

router.delete('/alumnos/:id', (req, res) =>{
    const { id } = req.params;
    for(var i = 0; i<alumnos.length; i++){
        if(alumnos[i].id == id){
            alumnos.splice(i, 1);
            res.json({msg: 'Student deleted'});
            return;
        }
    }
    res.status(404).json({error : 'Student not found'});
});

module.exports = router;