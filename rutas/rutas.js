const express = require('express');
const cliente = require('../models/cliente');
const router = express.Router();

router.get('/',(req,res) => {
    const clientes = cliente.find();
    console.log(clientes);
    
});

router.post('/',async (req,res) => {
    const {rut,nombre,direccion,comuna,providencia,region,correo,fecha,sexo,numero} = req.body;
    const cliente = new cliente({
        rut:rut,
        nombre:nombre,
        apellido:nombre,
        apellido:nombre,
        comuna:comuna,
        provdencia:providencia,
        region:region,
        correo:correo,
        fecha:fecha,
        sexo:sexo,
        numero:numero
    });
    await cliente.save();
    res.json({
        status: 'cliente guardado'
    })
});

module.exports = router;