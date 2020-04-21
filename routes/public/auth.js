const express = require('express');
const passport = require('passport');
const router = express.Router();
const userModel = require('../../models/user');


router.get('/signup', (req, res) => {
    renderData = {
        error: req.flash('error')
    }
    res.render('signup', renderData)
})

router.post('/signup', (req, res) => {
    if (req.body.password.length <= 7) {
        req.flash('error', 'Password shoud be 8 characters long');
        res.redirect('/signup');
    } else {
        userModel.findOne({ email: req.body.email })
            .then(data => {
                if (data) {
                    req.flash('error', 'Email already exists');
                    return res.redirect('/signup');
                } else {
                    var newUser = new userModel(req.body);
                    newUser.save().then(() => {
                        req.flash('success', 'Registration succesfull Login here to continue');
                        return res.redirect('/signin')
                    }).catch(e => console.log(e));
                }
            })
            .catch(
            )
    }
});


router.get('/signin', (req, res) => {
    var renderData = {
        error: req.flash('error'),
        success: req.flash('success')
    }
    res.render('signin', renderData);
});


router.post('/signin', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/user',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next);
});


router.get('/signout',(req,res)=>{
    req.logOut;
    req.flash('success','Bye have a good time')
    return res.redirect('/signin');
})
module.exports = router;