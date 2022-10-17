const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const{ ApolloServer, gql } = require('apollo-server-express');

//const { graphqlExpress,graphiqlExpress } = require('graphql-server-express');
//const {makeExecutableSchema} = require('graphql-tools');
const {merge} = require('lodash');

const Usuario=require('./models/usuario');
const Producto=require('./models/producto');
const Cliente=require('./models/cliente');
const Compra=require('./models/compra');

mongoose.connect('mongodb+srv://admin:admin@cluster0.czpan6m.mongodb.net/bdwebmovil',{useNewUrlParser: true, useUnifiedTopology: true});

const typeDefs = gql`
 type Usuario{
    id: ID!
    email: String!
    pass: String!
 }

 type Producto{
    id: ID!
    nombre:String!
    cantidad:String!
 }

 type Cliente{
    id: ID!
    rut:String!
    nombre:String!
    apellido_p:String!
    apellido_m:String!
    direccion:String!
    comuna:String!
    providencia:String!
    region:String!
    fecha_de_nacimiento:String!
    sexo:String!
    correo:String!
    numero:String!
 }

 type Compra{
    id:ID!
    id_usuario:String!
    id_producto:String!
    cantidad:String!
    fecha:String!
 }

 type Alert{
    message: String
 }

 input UsuarioInput {
    email: String!
    pass: String!
 }
 input ProductoInput{
    nombre: String!
    cantidad: String!
 }
 input ClienteInput{
    rut:String!
    nombre:String!
    apellido_p:String!
    apellido_m:String!
    direccion:String!
    comuna:String!
    providencia:String!
    region:String!
    fecha_de_nacimiento:String!
    sexo:String!
    correo:String!
    numero:String!
 }
 input CompraInput{
    id_usuario:String!
    id_producto:String!
    cantidad:String!
    fecha:String!
 }

 type Query {

   getUsuarios :[Usuario]
   getUsuario (id:ID!) : Usuario

   getProductos :[Producto]
   getProducto (id:ID!) : Producto

   getClientes:[Cliente]
   getCliente (id:ID!) : Cliente

   getCompras:[Compra]
   getCompra (id:ID!): Compra
 }
 type Mutation {
   addUsuario (input:UsuarioInput):Usuario
   updateUsuario (id:ID!,input:UsuarioInput):Usuario
   deleteUsuario (id:ID!):Alert

   addProducto(input:ProductoInput):Producto
   updateProducto (id:ID!,input:ProductoInput):Producto
   deleteProducto (id:ID!):Alert

   addCliente (input:ClienteInput):Cliente
   updateCliente (id:ID!,input:ClienteInput):Cliente
   deleteCliente (id:ID!):Alert

   addCompra (input:CompraInput):Compra
   updateCompra(id:ID!,input:CompraInput):Compra
   deleteCompra (id:ID!):Alert
   }

`;

const resolvers = {
    Query:{
        async getUsuarios(obj){
            const usuarios = await Usuario.find();
            return usuarios;
        },
        async getUsuario(obj, {id}){
            const usuario = await Usuario.findbyId(id);
            return usuario;
        },

        async getProductos(obj){
            const productos = await Producto.find();
            return productos;
        },
        async getProducto(obj,{id}){
            const producto = await Producto.findbyId(id);
            return producto;
        },

        async getClientes(obj){
            const clientes = await Cliente.find();
            return clientes;
        },
        async getCliente(obj,{id}){
            const cliente = await Cliente.findbyId(id);
            return cliente;
        },

        async getCompra(obj){
            const compras = await Compra.find();
            return compras;
        },
        async getCompra(obj,{id}){
            const compra = await Compra.findbyID(id);
            return compra;
        }

    },
    Mutation: {
        async addUsuario(obj, {input}){
            const usuario = new Usuario(input);
            await usuario.save();
            return usuario;

        },
        async updateUsuario(obj, {id,input}){
            const usuario = await Usuario.findByIdAndUpdate(id,input);
            return usuario;
        },
        async deleteUsuario(obj, {id}){
            await Usuario.deleteOne({_id : id});
            return {
                message: "Usuario eliminado"
            }
        },


        async addProducto(obj,{input}){
            const producto = new Producto(input);
            await producto.save();
            return producto;
        },
        async updateProducto(obj,{id,input}){
            const producto = await Producto.findByIdAndUpdate(id,input);
            return producto;
        },
        async deleteProducto(obj,{id}){
            await Producto.deleteOne({_id:id});
            return {
                message: "Producto elminado"
            }
        },

        async addCliente(obj,{input}){
            const cliente = new Cliente(input);
            await cliente.save();
            return cliente;
        },
        async updateCliente(obj,{id,input}){
            const cliente = await Cliente.findByIdAndUpdate(id,input);
            return cliente;
        },
        async deleteCliente(obj,{id}){
            await Cliente.deleteOne({_id:id});
            return {
                message : "Cliente Eliminado"
            }
        },

        async addCompra(obj,{input}){
            const compra = new Compra(input);
            await compra.save();
            return compra;
        },
        async updateCompra(obj,{id,input}){
            const compra = await Compra.findByIdAndUpdate(id,input);
            return compra;
        },
        async deleteCompra(obj,{id}){
            await Compra.deleteOne({_id:id});
            return{
                message : "Compra Eliminada"
            }
        }
    }
}

let apolloServer = null;

const corsOptions= {
    origin: "http://localhost:8090",
    credentials: false
};

async function startServer(){
    const apolloServer = new ApolloServer({typeDefs,resolvers,corsOptions});
    await apolloServer.start();

    apolloServer.applyMiddleware({ app , cors:false});
}

startServer();


const app = express();
app.use(cors());
app.listen(8090,function(){
    console.log("Servidor Iniciado");
})

