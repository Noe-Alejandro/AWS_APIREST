const { Router } = require('express');
const router = Router();
const _ = require('underscore');
const alumnos = require('../sample.json');
var alumnosIndex = alumnos.length;

router.get('/alumnos', (req, res) =>{
    res.status(200).json(alumnos);
});

router.get('/alumnos/:id', (req, res) =>{
    const { id } = req.params;
    if(!IsOnlyNumber(id)){
        res.status(400).json({error: 'Invalid id'});
        return;
    }
    for(var i = 0; i<alumnos.length; i++){
        if(alumnos[i].id == id){
            res.status(200).json(alumnos[i]);
            return;
        }
    }
    res.status(404).json({error: 'Student not found'});
});

router.post('/alumnos', (req, res) =>{
    const { nombres, apellidos, matricula, promedio} = req.body;
    if(!IsNotNull([nombres, apellidos, matricula, promedio])){
        res.status(400).json({error: 'Invalid request'});
        return;
    }
    if(!IsNumberType([promedio]) || !IsStringType([nombres, apellidos, matricula])){
        res.status(400).json({error: 'Invalid data type in request'});
        return;
    }
    
    alumnosIndex += 1;
    const id = alumnosIndex;
    const newAlumno = {id, ...req.body};
    alumnos.push(newAlumno);
    res.status(201).json(alumnos);
});

router.put('/alumnos/:id', (req, res) =>{
    const { id } = req.params;
    const { nombres, apellidos, matricula, promedio} = req.body;
    if(!IsOnlyNumber(id)){
        res.status(400).json({error: 'Invalid id'});
        return;
    }
    if(!IsNotNull([nombres, apellidos, matricula, promedio])){
        res.status(400).json({error: 'Invalid request'});
        return;
    }
    if(!IsNumberType([promedio]) || !IsStringType([nombres, apellidos, matricula])){
        res.status(400).json({error: 'Invalid data type in request'});
        return;
    }

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
});

router.delete('/alumnos/:id', (req, res) =>{
    const { id } = req.params;
    if(!IsOnlyNumber(id)){
        res.status(400).json({error: 'Invalid id'});
        return;
    }
    
    for(var i = 0; i<alumnos.length; i++){
        if(alumnos[i].id == id){
            alumnos.splice(i, 1);
            res.json({msg: 'Student deleted'});
            return;
        }
    }
    res.status(404).json({error : 'Student not found'});
});

function IsOnlyNumber(str){
    return /^[0-9]+$/.test(str);
}

function IsNotNull(array){
    for(var i = 0; i<array.length; i++){
        if(array[i] == null){
            return false;
        }
    }
    return true;
}

function IsNumberType(array){
    for(var i = 0; i<array.length; i++){
        if(typeof(array[i]) != "number"){
            return false;
        } 
    }
    return true;
}

function IsStringType(array){
    for(var i = 0; i<array.length; i++){
        if(typeof(array[i]) != "string"){
            return false;
        } 
    }
    return true;
}

module.exports = router;