const User = require('../models/userModel');

const userController = {
    getAllUsers: async(req,res) => {
        try{
            const users = await User.find();
            res.json(users);
        }catch(error){
            console.error('Error al obtener usuarios:',error);
            res.status(500).json({message:'Internal Server Error'});
        }
    },

};

module.exports = userController