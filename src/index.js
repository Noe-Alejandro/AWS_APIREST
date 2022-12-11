const express = require('express');
const morgan = require('morgan');

const app = express();

//Settings
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Routes
app.use(require('./routes/alumnos'));
app.use(require('./routes/profesores'));

const db = require('../models');

db.sequelize.sync().then((req) => {
//Starting Server
    app.listen(app.get('port'), () =>{
        console.log(`Server on port ${app.get('port')}`);
    });
});
