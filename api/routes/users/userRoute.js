const express = require('express');
const { protect } = require('../../middleware/authMiddleware');
const { Userupdate, Userdelete, getUser }  = require('./userController')


const userRouter = express.Router();

    //UPDATE
    userRouter.put('/:id', protect, Userupdate)
    //DELETE
    userRouter.delete('/:id', protect, Userdelete)
    //GET
    userRouter.get('/find/:id',  getUser)

    //GET ALL

    //GET USER STATS


module.exports  = userRouter