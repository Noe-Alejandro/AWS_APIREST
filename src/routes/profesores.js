const { Router } = require('express');
const router = Router();
const _ = require('underscore');
const profesores = [];
var profesoresIndex = profesores.length;

router.get('/profesores', (req, res) =>{
    res.status(200).json(profesores);
});

router.get('/profesores/:id', (req, res) =>{
    const { id } = req.params;
    if(!IsOnlyNumber(id)){
        res.status(400).json({error: 'Invalid id'});
        return;
    }
    for(var i = 0; i<profesores.length; i++){
        if(profesores[i].id == id){
            res.status(200).json(profesores[i]);
            return;
        }
    }
    res.status(404).json({error: 'Student not found'});
});

router.post('/profesores', (req, res) =>{
    const { numeroEmpleado, nombres, apellidos, horasClase} = req.body;
    if(!IsNotNull([numeroEmpleado, nombres, apellidos, horasClase])){
        res.status(400).json({error: 'Invalid request'});
        return;
    }
    if(!IsNumberType([numeroEmpleado, horasClase]) || !IsStringType([nombres, apellidos])){
        res.status(400).json({error: 'Invalid data type in request'});
        return;
    }
    
    profesoresIndex += 1;
    const id = profesoresIndex;
    const newProfesores = {id, ...req.body};
    profesores.push(newProfesores);
    res.status(201).json(profesores);
});

router.put('/profesores/:id', (req, res) =>{
    const { id } = req.params;
    const { numeroEmpleado, nombres, apellidos, horasClase} = req.body;
    if(!IsOnlyNumber(id)){
        res.status(400).json({error: 'Invalid id'});
        return;
    }
    if(!IsNotNull([numeroEmpleado, nombres, apellidos, horasClase])){
        res.status(400).json({error: 'Invalid request'});
        return;
    }
    if(!IsNumberType([numeroEmpleado, horasClase]) || !IsStringType([nombres, apellidos])){
        res.status(400).json({error: 'Invalid data type in request'});
        return;
    }

    for(var i = 0; i<profesores.length; i++){
        if(profesores[i].id == id){
            profesores[i].numeroEmpleado = numeroEmpleado;
            profesores[i].nombres = nombres;
            profesores[i].apellidos = apellidos;
            profesores[i].horasClase = horasClase;
            res.status(200).json({msg: 'Student updated'});
            return;
        }
    }
    res.status(404).json({error: 'Student not found'});
});

router.delete('/profesores', (req, res) =>{
    res.status(405).json({error : 'Not allowed'});
});

router.delete('/profesores/:id', (req, res) =>{
    const { id } = req.params;
    if(!IsOnlyNumber(id)){
        res.status(400).json({error: 'Invalid id'});
        return;
    }
    
    for(var i = 0; i<profesores.length; i++){
        if(profesores[i].id == id){
            profesores.splice(i, 1);
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