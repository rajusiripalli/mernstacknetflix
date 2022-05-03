const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const User = require('../../models/User');


//@desc Register New User
//@route POST /api/register
//@acces Public
const registerUser = asyncHandler(async (req, res) => {
    const {username, email, password } = req.body
    if(!username || !email || !password){
        res.status(400)
        throw new Error('Please add all fields')
    }

    //check if user exists
    const userExist = await User.findOne({email})

    if(userExist){
        res.status(400)
        throw new Error('User already exists');
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user  = await User.create({
        username,
        email,
        password: hashedPassword
    })
    if(user){
        res.status(201).json(user)
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }
})

module.exports = {
    registerUser,
}