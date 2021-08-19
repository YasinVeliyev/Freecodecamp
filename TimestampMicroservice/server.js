// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// app.get("/api/2015-12-25", (req,res)=>{
//     res.json({
//         unix:Date(),
//         utc:new Date().toUTCString()
//     })
// })

app.get("/api/:date?", (req,res,next)=>{
    let time = req.params.date
    console.log(time)
    if(!time){
       return res.json({
            unix:Date.now(),
            utc:new Date().toUTCString()
        }) 
    }
    if(time.match(/^[0-9]+$/g)){
       return res.json({
            unix:+time,
            utc:new Date(+time).toUTCString()
        })  
    }
   if(new Date(time).toString() === "Invalid Date"){
       return res.json({ error : "Invalid Date" })
   }

    return res.json({
            unix:Date.parse(time),
            utc:new Date(time).toUTCString()
        })
})



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
