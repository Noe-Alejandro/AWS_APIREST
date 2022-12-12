const { Router } = require('express');
const router = Router();
const _ = require('underscore');
const { profesores } = require('../../models');

router.get('/profesores', (req, res) =>{
    profesores.findAll().then((user) =>{
        res.status(200).json(user);
    });
});

router.get('/profesores/:id', (req, res) =>{
    const { id } = req.params;
    if(!IsOnlyNumber(id)){
        res.status(400).json({error: 'Invalid id'});
        return;
    }
    profesores.findByPk(id).then((user => {
        if(!user){
            res.status(404).json({error: 'Teacher not found'});
        }else{
            res.status(200).json(user);
            return;
        }
    }));
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
    
    const newProfesores = {...req.body};
    profesores.create({
        nombres: newProfesores.nombres,
        apellidos: newProfesores.apellidos,
        numeroEmpleado: newProfesores.numeroEmpleado,
        horasClase: newProfesores.horasClase
    })
    .then((user) =>{
        res.status(201).json(user);
    })
    .catch(err => {
        res.status(500).json({error: err});
    });
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

    profesores.findByPk(id)
    .then((user => {
        if(!user){
            res.status(404).json({error: 'Teacher not found'});
            return;
        }else{
            user.update({
                nombres: nombres,
                apellidos: apellidos,
                numeroEmpleado: numeroEmpleado,
                horasClase: horasClase
            })
            .then(() =>{
                res.status(200).json({msg: 'Teacher updated'});
            });
        }
    }));
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
    
    profesores.findByPk(id)
    .then((user => {
        if(!user){
            res.status(404).json({error : 'Teacher not found'});
        }else{
            user.destroy().then(() =>{
                res.json({msg: 'Teacher deleted'});
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