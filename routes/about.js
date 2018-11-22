const express = require('express')
const router  = express.Router()

//defining the about path
router.get('/about',function(req,resp){
    resp.render('about')
})
module.exports = router