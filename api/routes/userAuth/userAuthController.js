const jwt = require('jsonwebtoken');
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



//@desc Authenticate a new User
//@route POST /api/login
//@acces Private
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body
    
    //Check for user email 
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))){
        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id, user.isAdmin)

        })
    }else{
        res.status(400)
        throw new Error('Invalid credentials')
    }
})


//Generate JWT Token
const generateToken = (id, isAdmin) => {
    return jwt.sign({id, isAdmin}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = {
    registerUser,
    loginUser,
} 