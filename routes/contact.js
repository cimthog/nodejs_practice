const express = require('express')
const router  = express.Router()

//defining the contact path
router.get('/contact',function(req,resp, next){
    resp.render('contact');
})
module.exports = router