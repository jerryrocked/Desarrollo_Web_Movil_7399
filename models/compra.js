const mongoose = require('mongoose');

const compraSchema=new mongoose.Schema({
    id_usuario:String,
   id_producto:String,
   cantidad:String,
   fecha:String
});

module.exports=mongoose.model('compra',compraSchema);