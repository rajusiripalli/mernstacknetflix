const asyncHandler = require('express-async-handler');

//@desc Update User
//@route POST /api/user/id
//@acces Private
const Userupdate = asyncHandler( async (req, res) => {
    return res.status(200).json("user updated")
})


module.exports = {
    Userupdate,
}