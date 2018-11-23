const express = require('express')
const router  = express.Router()

router.get('/index',(req, res) => {
    res.render('index',{name:"Welcome to Nature Park" })
})
module.exports = router