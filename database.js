const { default: mongoose } = require('mongoose');
const mognoose = require('mongoose');

const URL = 'mongodb+srv://admin:admin@cluster0.czpan6m.mongodb.net/bdwebmovil';

mongoose.connect(URL,{useNewUrlParser:true,useUnifiedTopology:true})
.then(db => console.log("Conectado a la base de datos"))
.catch(err => console.log(err));


module.exports = mongoose;

