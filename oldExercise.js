const express= require('express');
const mongoose= require('mongoose');

mongoose.connect('mongodb+srv://anacaszapata:mtBBCv6zC88hvo7g@operadores.0mgu7oy.mongodb.net/')
const db=mongoose.connection;

db.on('error',console.error.bind(console,'connection error'));

db.once('open', function(){
    console.log('Connected to MongoDB');
    // model
    userSchema = mongoose.Schema({
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
   
const User = mongoose.model('User' ,userSchema);

const app = express();
app.use(express.json());

//  igualdad
// app.get("/api/usuarios", async(req,res) => {
//     const users = await users.find({edad:{$eq:20} });
//     res.json(users);
// });

//  1)mayores de 18 años
app.get("/api/users/adult", async(req,res) => {
    const users=await User.find({edad:{$gt:18}});
    res.json(users);
});

// menor que
// app.get("/api/usuarios", async(req,res) => {
//     const users = await User.find({edad:{$lt:20} });
//     res.json(users);
// });

// mayor que o igual
// app.get("/api/usuarios", async(req,res) => {
//     const users = await User.find({edad:{$gte:20} });
//     res.json(users);
// });

// 2) Usuarios que sean de Londres o de Paris
 app.get("/api/users/city", async(req,res) => {
     const users = await User.find({ciudad:{$in:["Londres", "Paris"]} });
     res.json(users);
 });

// 3)Obtener a todos los usuarios que ganen más de $2000 al mes y tengan menos de 30 años.
app.get("/api/users/salaryAge", async (req, res) => {
    const users = await User.find({$and: [{ salario: { $gt: 2000 } },{ edad: { $lt: 30 } }] });
    res.json(users);
});

// 4)Obtener a todos los usuarios que sean de España y ganen más de $3000 al mes.
app.get("/api/users/spainAge", async (req, res) => {
    const users = await User.find({$and: [{ pais: "España" },{ salario: { $gt: 3000 } }] });
    res.json(users);
});

// 5)Obtener todos los usuarios que tengan entre 25 y 35 años.
app.get("/api/users/ageBetween2535", async (req, res) => {
    const users = await User.find({edad: { $gte: 25, $lte: 35 } });
    res.json(users);
});

// 6)Obtener a todos los usuarios que no sean de Estados Unidos.
app.get("/api/users/notUsa", async (req, res) => {
    const users = await User.find({pais: { $ne: "Estados Unidos" } });
    res.json(users);
});

// 7)Obtener a todos los usuarios que sean de Londres y que ganen más de $2500 o que tengan más de 30 años.
app.get("/api/users/londonSalary", async (req, res) => {
    const users = await User.find({ciudad: "Londres",$or: [{ salario: { $gt: 2500 } },{ edad: { $gt: 30 } }] });
    res.json(users);
});

// 8)Obtener a todos los usuarios que sean de Australia y tengan un peso mayor a 140 libras.
app.get("/api/users/australiaWeight", async (req, res) => {
    const users = await User.find({pais: "Australia",peso: { $gt: 140 } });
    res.json(users);
});

// 9)Obtener a todos los usuarios que no sean de Londres ni de París.
app.get("/api/users/not-london-or-paris", async (req, res) => {
    const users = await User.find({ciudad: { $nin: ["Londres", "París"] }});
    res.json(users);
});

// 10)Obtener a todos los usuarios que ganen menos de $2000 al mes o que tengan más de 40 años.
app.get("/api/users/lowSalary40", async (req, res) => {
    const users = await User.find({$or: [{ salario: { $lt: 2000 } },{ edad: { $gt: 40 } }] });
    res.json(users);
});

// 11)Obtener a todos los usuarios que sean de Canadá y ganen más de $4000 al mes o que tengan una altura mayor a 180 cm.
app.get("/api/users/canadaSalary", async (req, res) => {
    const users = await User.find({
        pais: "Canadá",$or: [{ salario: { $gt: 4000 } },{ altura: { $gt: 180 } }]});
        res.json(users);
});

// 12)Obtener todos los usuarios que sean de Italia y tengan entre 20 y 30 años.
app.get("/api/users/italyBetween2030", async (req, res) => {
    const users = await User.find({pais: "Italia",edad: { $gte: 20, $lte: 30 }});
    res.json(users);
});

// 13)Obtener todos los usuarios que no tengan un correo electrónico registrado.
app.get("/api/users/noEmail", async (req, res) => {
    const users = await User.find({correo: { $exists: false }});
    res.json(users);
});

// 14)Obtener todos los usuarios que sean de Francia y que su salario esté entre $3000 y $5000 al mes.
app.get("/api/users/franceSalary", async (req, res) => {
    const users = await User.find({
        pais: "Francia",salario: { $gte: 3000, $lte: 5000 }});
        res.json(users);
});

// 15)Obtener todos los usuarios que sean de Brasil y que tengan un peso menor a 120 libras o más de 140 libras.
app.get("/api/users/brasilWeight", async (req, res) => {
    const users = await User.find({pais: "Brasil",$or: [{ peso: { $lt: 120 } }, { peso: { $gt: 140 } } ]});
    res.json(users);
});

// 16)Obtener todos los usuarios que sean de Argentina o de Chile y que tengan una edad menor a 25 años.
app.get("/api/users/argentinaChile", async (req, res) => {
    const users = await User.find({
        $or: [{ pais: "Argentina" },{ pais: "Chile" }], edad: { $lt: 25 }});
    res.json(users);
});

// 17)Obtener a todos los usuarios que no sean de España ni de México y que ganen menos de $3000 al mes.
app.get("/api/users/notSpainMexico", async (req, res) => {
    const users = await User.find({$and: [{ $nor: [ { pais: "España" }, { pais: "México" } ] },{ salario: { $lt: 3000 } }]});
    res.json(users);
});

// 18)Obtener todos los usuarios que sean de Alemania y que tengan un salario menor a $4000 o una edad mayor a 35 años.
app.get("/api/users/germanySalaryAge", async (req, res) => {
    const users = await User.find({
        pais: "Alemania", $or: [{ salario: { $lt: 4000 } },{ edad: { $gt: 35 } }]});
    res.json(users);
});

// 19)Obtener todos los usuarios que no sean de Colombia y que su altura sea menor a 170 cm.
app.get("/api/users/notColombia", async (req, res) => {
    const users = await User.find({$and: [{ pais: { $ne: "Colombia" } }, { altura: { $lt: 170 } } ]});
    res.json(users);
});

// 20)Obtener todos los usuarios que sean de India y que no tengan un salario registrado.
app.get("/api/users/indiaNoSalary", async (req, res) => {
    const users = await User.find({pais: "India", salario: { $exists: false }});
    res.json(users);
});




















// traiga todo a excepcion de
// app.get("/api/usuarios", async(req,res) => {
//     const users=await User.find({edad:{$nin:[5,10,15] } });
//     res.json(users);
// });

// un campo especifico donde un campo existe o no
// app.get("/api/usuarios", async(req,res) => {
//     const users = await users.find({edad:{$exists:true} });
//     res.json(users);
// });







app.listen(3000,function(){
    console.log('Servidor escuchando en el puerto 3000');
});
})
