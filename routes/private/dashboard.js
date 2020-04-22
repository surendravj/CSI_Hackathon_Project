const express = require('express');
const router = express.Router();
const ensureAuthenticated = require('../../auth/is_Authenticated').ensureAuthenticated;


router.get('/user', ensureAuthenticated, (req, res) => {
    var renderData = {
        name: req.user.name
    }
    if (!req.user.isTutor) {
        return res.render('studentDashboard', renderData);
    }
    return res.render('tutorDashboard', renderData);
})



router.get('/user/books', ensureAuthenticated, (req, res) => {
    renderData = {
        name: req.user.name,
    }
    res.render('books', renderData);
});


router.get('/courses', ensureAuthenticated, (req, res) => {
    var renderData = {
        name: req.user.name
    }
    res.render('courses', renderData);
})

module.exports = router;