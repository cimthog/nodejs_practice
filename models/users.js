const mongoose = require('mongoose')


const Profile = new mongoose.Schema({
    username: {type:String, trim:true, required:true,unique:true},
    email:{type:String, trim:true, required:true,unique:true},
    password: {type:String,trim:true,required:true},
    address: {type:String,trim:true},
    date: {type:Date},
    date_joined: {type:Date,default:Date.now}

})

module.exports = mongoose.model('users',Profile)