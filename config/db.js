const mongoose= require('mongoose');
let User

const connectDatabase = async () => {
    try{
         // Se comprueba si el modelo de usuario (User) ya está definido. Si no está definido, se define utilizando el método mongoose.model(). Se pasa el nombre del modelo como primer argumento y el esquema del modelo como segundo argumento
        if(!User){
            User = mongoose.model('notas',require('../models/userModel').schema);
        }
        await mongoose.connect('mongodb+srv://anacaszapata:mtBBCv6zC88hvo7g@operadores.0mgu7oy.mongodb.net/')
        .then(()=>console.log('MongoDB connected'))
        .catch((err) => console.log(err));

        await initializeData();

    }catch (error){
        console.error('Failed to connect to MongoDB:',error);
        process.exit(1);
    }
};
const initializeData = async () => {
    try{
        await User.deleteMany();

        const userData = [
            {
                nombres:"Ana",
                apellidos:"Zapata",
                edad:21,
                ciudad:"Medellin",
                pais:"Colombia",
                salario:4870000,
                correo:"anacasza@gmail.com",
                altura:158,
                peso:52
                
            },
            {
                nombres:"Victor",
                apellidos:"Mejia",
                edad:23,
                ciudad:"Medellin",
                pais:"Colombia",
                salario:8700000,
                correo:"viictorm@gmail.com",
                altura:169,
                peso:60
            },
        ];
        await User.insertMany(userData);
        console.log('Data successfully initialized');
        } catch(error){
            console.error('Data initialization error:',error);
            process.exit(1);
        }
};

module.exports = connectDatabase;