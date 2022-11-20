const { Router } = require('express');
const router = Router();
const alumnos = require('../sample.json');

router.get('/alumnos', (req, res) =>{
    res.json(alumnos);
});

router.post('/alumnos', (req, res) =>{
    const { nombres, apellidos, matricula, promedio} = req.body;
    if(nombres && apellidos && matricula && promedio){
        const id = alumnos.length + 1;
        const newAlumno = {id, ...req.body};
        console.log(newAlumno);
        alumnos.push(newAlumno);
        res.status(201).json(alumnos);
    }else{
        res.status(404).json({error: 'There was an error'});
    }
});

router.delete('/alumnos/:id', (req, res) =>{
    console.log(req.params);
    res.send('Deleted');
});

module.exports = router;