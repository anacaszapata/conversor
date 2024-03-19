const express= require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/api/users/users', userController.getAllUsers);

module.exports = router;