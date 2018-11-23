const express = require('express'),
 router = express.Router(),
 passport = require('passport'),
 flash=require("connect-flash"),
 user = require('../controllers/userController');

// routes
router.post('/register', register);
router.get('/', getAll);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

router.post('/authenticate',function(req,res,next){
    passport.authenticate('local',
    {
        successRedirect: '/home',
        failureRedirect: '/index',
        failureFlash: true
    })(req,res,next) ;   
});


function register(req, res, next) {
    user.create(req.body)
        .then(() =>{
            
            req.flash('success_msg',"registration successful,please login");
            res.redirect('/index');
        })
        .catch(err => next(err));
}

function getAll(req, res, next) {
    user.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    user.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    user.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    user.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    user.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}