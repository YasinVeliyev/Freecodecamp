require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

let urls = new Map()
// Basic Configuration
const port = process.env.PORT || 3000;


app.use(cors());
app.use('/public', express.static(`${process.cwd()}/public`));
app.use(express.urlencoded({ extended: true }))
app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.post("/api/shorturl",(req ,res)=>{
    if(!req.body.url.match(/(http:\/\/|https:\/\/)\S+\.\S+/gi)){
        return res.json({ error: 'invalid url' })
    }
    let short_url=Array.from(urls.keys()).length
    urls.set(short_url,req.body.url)
    res.json({
        original_url : req.body.url, 
        short_url
    })
})

app.get("/api/shorturl/:url",(req,res)=>{
    let short_url = +req.params.url
    if(urls.has(short_url)){
        res.redirect(urls.get(short_url))
    }
    else{
        res.status(404).json({
            message:"Not Found"
        })
    }
})
app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
