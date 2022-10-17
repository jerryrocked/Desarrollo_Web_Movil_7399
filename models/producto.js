const mongoose = require('mongoose');

const productoSchema=new mongoose.Schema({
    nombre:String,
   cantidad:String
});

module.exports=mongoose.model('producto',productoSchema);