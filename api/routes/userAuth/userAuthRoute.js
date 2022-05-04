const express = require('express');
const {registerUser, loginUser} = require('./userAuthController');

userauthRouter = express.Router();

userauthRouter.post('/register', registerUser);
userauthRouter.post('/login', loginUser);

module.exports = userauthRouter;