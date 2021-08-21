const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const {User,Exercise} = require("./userModel")

app.use(cors())
app.use((req,res,next)=>{
    console.log(req.url);
    next()
})
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
mongoose.connect(process.env.MONGO_URI,{useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify:true},(err)=>{console.log(err)
})


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});


app.post("/api/users",(req,res)=>{
    User.create({
        username:req.body.username
    },(err,data)=>{
        if(err){
            res.status(500).json({
                message:"Something is wrong"
            })
        }
        res.json({
            username:data.username,
            _id:data._id
        })
    })
})

app.get("/api/users",(req,res)=>{
    User.find({},(err,data)=>{
        if(err){
            res.status(500).json({
                message:"Something is wrong"
            })
        }
        let users = data.map(elem=>{return{"username":elem.username,"_id":elem._id}
        })
        res.json(users)
    })
})

app.post("/api/users/:_id/exercises", (req, res) => {
    if (!req.body.date) {
        req.body.date = new Date();
    } else {
        req.body.date = new Date(req.body.date);
    }
    User.findById(req.params._id, (err, user) => {
        Exercise.create(
            {
                userId: user._id,
                username: user.username,
                duration: req.body.duration,
                date: req.body.date,
                description: req.body.description,
            },
            (err, data) => {
               
                res.json({
                    _id: data.userId,
                    username: user.username,
                    date: data.date.toDateString(),
                    duration: data.duration,
                    description: data.description,
                });
            }
        );
    });
});

app.get("/api/users/:_id/logs", (req, res) => {
    let { from, to, limit } = req.query;
    Exercise.countDocuments({}, (err, data) => {
        limit = limit || data;
        from = new Date(from || "1000");
        to = new Date(to || "3000");
        Exercise.aggregate([{ $match: { userId: req.params._id } }])
        .match({
            date: { $gt: from },
            date: { $lt: to },
        })
        .limit(+limit)
        .exec((err, data) => {
            if (err) {
                console.log(err);
            }
            countOfDocument = data.length;
            res.json({ log: data, count: data.length });
        });
    });    
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
