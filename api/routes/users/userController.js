const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const User = require('../../models/User');

//@desc Update User
//@route POST /api/user/id
//@acces Private
const Userupdate = asyncHandler( async (req, res) => {

    if(req.user._id.toString() === req.params.id){
            if(req.body.password){
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(req.body.password, salt);
                req.body.password = hashedPassword
            }
            try {

                const updateuser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true})
                res.status(200).json(updateuser);

            } catch (error) {
                    res.status(500)
                    throw new Error(error);
            }
    }else{
        res.status(403)
        throw new Error('You can update only your account!')
    }
})

//@desc Update User
//@route POST /api/user/id
//@acces Private
const Userdelete = asyncHandler( async (req, res) => {

    if(req.user._id.toString() === req.params.id){
           
            try {
                await User.findByIdAndDelete(req.params.id)
                res.status(200).json('user has been deleted...');
            } catch (error) {
                    res.status(500)
                    throw new Error(error);
            }
    }else{
        res.status(403)
        throw new Error('You can delete only your account!')
    }
})

//@desc Update User
//@route POST /api/user/id
//@acces Public
const getUser = asyncHandler( async (req, res) => {

            try {
                const userinfo =  await User.findById(req.params.id).select('-password')
                res.status(200).json(userinfo);
            } catch (error) {
                    res.status(500)
                    throw new Error(error);
            }
    
})


module.exports = {
    Userupdate,
    Userdelete,
    getUser
}