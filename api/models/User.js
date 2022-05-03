const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, 'Please add a username'], 
        unique: true,
    },
    email:{
        type: String,
        required: [true, 'Please add a email'],
        unique: true
    },
    password: {type: String, required: [true, 'Please add a password']},
    profilepic: {type: String, default: ""},
    isAdmin: {type: Boolean, default: false}
},
{
    timestamps: true
}
);

module.exports = mongoose.model('User', userSchema);