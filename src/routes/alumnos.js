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
    _.each(alumnos, (alumno, i) =>{
        if(alumno.id == id){
            res.json(alumno);
        }
    });
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
        res.status(404).json({error: 'There was an error'});
    }
});

router.put('/alumnos/:id', (req, res) =>{
    const { id } = req.params;
    const { nombres, apellidos, matricula, promedio} = req.body;
    if(nombres && apellidos && matricula && promedio){
        _.each(alumnos, (alumno, i) =>{
            if(alumno.id == id){
                alumno.nombres = nombres;
                alumno.apellidos = apellidos;
                alumno.matricula = matricula;
                alumno.promedio = promedio;
                res.json({msg: 'Student updated'});
            }
        });
    }else{
        res.status(404).json({error: 'There was an error'});
    }
});

router.delete('/alumnos/:id', (req, res) =>{
    const { id } = req.params;
    var index = 0;
    _.each(alumnos, (alumno, i) =>{
        if(alumno.id == id){
            index = i;
            res.json({msg: 'Student deleted'});
        }
    });
    alumnos.splice(index, 1);
});

module.exports = router;