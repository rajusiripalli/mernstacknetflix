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

//@desc Delete User
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
//@route POST /api/user/find/id
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


//@desc Get All Users
//@route POST /api/user/find/users
//@acces Private
const getallUsers = asyncHandler( async (req, res) => {
    const query = req.query.new
    if(req.user.isAdmin){
           
            try {
                const users = query ? await User.find().sort({ _id: -1 }).limit(4) : await User.find();
                res.status(200).json(users)
            } catch (error) {
                    res.status(500)
                    throw new Error(error);
            }
    }else{
        res.status(403)
        throw new Error('Your not allowed to see all users!')
    }
})

//@desc Get User Stats
//@route POST /api/user/stats
//@acces Private
const getuserStats = asyncHandler( async (req, res) => {
    const today = new Date();
    const latYear = today.setFullYear(today.setFullYear() - 1);

    const monthsArray = [
        "january",
        "february",
        "march",
        "april",
        "may",
        "june",
        "july",
        "august",
        "september",
        "october",
        "november",
        "december",
    ]

    try {
        const data = await User.aggregate([
            {
                $project: {
                    month: {$month: "$createdAt"}
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1},
                }
            }
        ])
        res.status(200).json(data);
    } catch (error) {
        res.status(500)
        throw new Error(error)
    }
})

module.exports = {
    Userupdate,
    Userdelete,
    getUser,
    getallUsers,
    getuserStats
    
}