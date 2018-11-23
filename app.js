const express = require('express'),
 bodyParser = require('body-parser'),
 errorHandler = require('./helpers/error_handler'),
 passport = require('passport'),
 flash=require("connect-flash"),
 validator = require('express-validator'),
 session = require('express-session');
 app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//express-session middleware
app.use(session({ cookie: { maxAge:6000 }, 
    secret: 'fest',
    resave: false, 
    saveUninitialized: false}));

//express-message middleware
app.use(flash());
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
})

//passport config
require('./helpers/passport_auth')(passport);
app.use(passport.initialize());
app.use(passport.session());




//import routes
const index = require('./routes/index')
const home = require('./routes/home')
const api = require('./routes/api')
const about = require('./routes/about')
const reg = require('./routes/regSuc')
const contact = require('./routes/contact')

app.set('view engine','ejs');
app.use('/public', express.static('public'));



//set routes
app.use('/',index)
app.use('/',home)
app.use('/api',api)
app.use('/',about)
app.use('/',contact) 
app.use('/',reg) 

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? 80 : 3000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});

module.exports = app
