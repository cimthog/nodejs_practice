var express = require('express');
var app = express();

app.set('view engine','ejs');
app.use('/public', express.static('public'));


app.get('/home', function(req, resp){
    resp.render('index')
})
//defining the about path
app.get('/about',function(req,resp){
    resp.render('about')
})
//defining the contact path
app.get('/contact',function(req,resp, next){
    resp.render('contact')
})
//error handling middleware
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('An error occured!')
  })

app.listen(3000,() => console.log('Listening on port 3000!'))
