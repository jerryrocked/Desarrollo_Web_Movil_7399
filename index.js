const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

app.set('port',process.env.PORT || 3000);
app.use(morgan('dev'));
app.use(express.json());

//rutas
app.use('/api',require('./rutas/rutas'));


//archivo estatico
app.use(express.static(path.join(__dirname,'public')));

app.listen(app.get('port'),function(){
    console.log("Servidor iniciado en el puerto" + app.get('port'));
}); 