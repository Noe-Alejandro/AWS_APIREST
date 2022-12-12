const { Router } = require('express');
const { renameSync } = require('fs');
const router = Router();
const _ = require('underscore');
const { alumnos } = require('../../models');

router.get('/alumnos', (req, res) =>{
    alumnos.findAll().then((users) =>{
        res.send(users);
    });
});

router.get('/alumnos/:id', (req, res) =>{
    const { id } = req.params;
    if(!IsOnlyNumber(id)){
        res.status(400).json({error: 'Invalid id'});
        return;
    }
    alumnos.findByPk(id).then((user => {
        if(!user){
            res.status(404).json({error: 'Student not found'});
        }else{
            res.status(200).json(user);
            return;
        }
    }));
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
    
    const newAlumno = { ...req.body};
    alumnos.create({
        nombres: newAlumno.nombres,
        apellidos: newAlumno.apellidos,
        matricula: newAlumno.matricula,
        promedio: newAlumno.promedio,
        fotoPerfilUrl: newAlumno.fotoPerfilUrl
    })
    .then((user) =>{
        res.status(201).json(user);
    })
    .catch(err => {
        res.status(500).json({error: err});
    });
});

router.put('/alumnos/:id', (req, res) =>{
    const { id } = req.params;
    const { nombres, apellidos, matricula, promedio, fotoPerfilUrl} = req.body;
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

    alumnos.findByPk(id)
    .then((user => {
        if(!user){
            res.status(404).json({error: 'Student not found'});
            return;
        }else{
            user.update({
                nombres: nombres,
                apellidos: apellidos,
                matricula: matricula,
                promedio: promedio,
                fotoPerfilUrl: fotoPerfilUrl
            })
            .then(() =>{
                res.status(200).json({msg: 'Student updated'});
            });
        }
    }));
});

router.delete('/alumnos', (req, res) =>{
    res.status(405).json({error : 'Not allowed'});
});

router.delete('/alumnos/:id', (req, res) =>{
    const { id } = req.params;
    if(!IsOnlyNumber(id)){
        res.status(400).json({error: 'Invalid id'});
        return;
    }
    
    alumnos.findByPk(id)
    .then((user => {
        if(!user){
            res.status(404).json({error : 'Student not found'});
        }else{
            user.destroy().then(() =>{
                res.json({msg: 'Student deleted'});
            });
        }
    }));
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