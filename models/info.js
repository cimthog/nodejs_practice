const mongoose = require('mongoose')


const Info = new mongoose.Schema({
    email:{type:String, trim:true, required:true},
    desc: {type:String,trim:true,required:true},
    date_joined: {type:Date,default:Date.now}

})

module.exports = mongoose.model('users',Info)