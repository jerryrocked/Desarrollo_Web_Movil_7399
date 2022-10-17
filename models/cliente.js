const mongoose = require('mongoose');

const clienteSchema=new mongoose.Schema({
    rut:String,
    nombre:String,
    apellido_p:String,
    apellido_m:String,
    direccion:String,
    comuna:String,
    providencia:String,
    region:String,
    fecha_de_nacimiento:String,
    sexo:String,
    correo:String,
    numero:String
});

module.exports=mongoose.model('cliente',clienteSchema);