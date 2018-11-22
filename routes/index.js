const express = require('express')
const router  = express.Router()

router.get('/index',(req, resp) => {
    resp.render('index',{name:"Welcome to Nature Park"})
})
module.exports = router