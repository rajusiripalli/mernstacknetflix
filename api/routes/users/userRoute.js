const express = require('express');
const { protect } = require('../../middleware/authMiddleware');
const { Userupdate, Userdelete, getUser, getallUsers, getuserStats }  = require('./userController')


const userRouter = express.Router();

    //UPDATE
    userRouter.put('/:id', protect, Userupdate)
    //DELETE
    userRouter.delete('/:id', protect, Userdelete)
    //GET
    userRouter.get('/find/:id',  getUser)

    //GET ALL
    userRouter.post('/find/users', protect, getallUsers)

    //GET USER STATS
    userRouter.get('/stats', getuserStats)


module.exports  = userRouter