const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    description:String,
    duration:Number,
    date:{
        type:Date,
        default:Date.now
    }
})

exports.User = mongoose.model('User', userSchema)