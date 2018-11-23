const express = require('express')
const router  = express.Router()

router.get('/regSuc',(req,res,next)=>{
    res.render('regSuc');
})
module.exports = router;