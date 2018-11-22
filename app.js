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
app.use(session({ cookie: { secure:true }, 
    secret: 'fest',
    resave: false, 
    saveUninitialized: false}));

//express-message middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

//passport config
require('./helpers/passport_auth')(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());



//import routes
const index = require('./routes/index')
const home = require('./routes/home')
const api = require('./routes/api')
const about = require('./routes/about')
const contact = require('./routes/contact')

app.set('view engine','ejs');
app.use('/public', express.static('public'));



//set routes
app.use('/',index)
app.use('/',home)
app.use('/api',api)
app.use('/',about)
app.use('/',contact) 

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? 80 : 3000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});

module.exports = app
