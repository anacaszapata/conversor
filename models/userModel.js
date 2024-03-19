const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nombres:String,
    apellidos:String,
    edad:Number,
    ciudad:String,
    pais:String,
    salario:Number,
    correo:String,
    altura:Number,
    peso:Number
});

const User = mongoose.model('users',userSchema);

module.exports= User;