const express = require('express');
const {registerUser} = require('./userAuthController');

userauthRouter = express.Router();

userauthRouter.post('/register', registerUser);

module.exports = userauthRouter;