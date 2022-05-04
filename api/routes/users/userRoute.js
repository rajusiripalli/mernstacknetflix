const express = require('express')
const { Userupdate }  = require('./userController')


const userRouter = express.Router();

//UPDATE
userRouter.put('/:id', Userupdate)

//DELETE

//GET

//GET ALL

//GET USER STATS


module.exports  = userRouter