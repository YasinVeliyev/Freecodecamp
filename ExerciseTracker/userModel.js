const mongoose = require("mongoose")

const exerciseSchema = new mongoose.Schema({
    userId:String,
    description:{type:String},
    duration:{type:Number},
    date:{
        type:Date,
        default:Date.now
    }
})

// exerciseSchema.pre('^find',function(next){
//     console.log(this.date)
//     if(!this.date){
//         this.date = Date.now()
//     }
// })

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    exercise:{
        type:[exerciseSchema],
        }
})

exports.User = mongoose.model('User', userSchema);
exports.Exercise = mongoose.model('Exercise',exerciseSchema);