// function to check if the user is authenticated or not
module.exports = {
    ensureAuthenticated: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }
        else {
            req.flash('error', 'Please Login To Access That Resource');
            res.redirect('/signin');
        }
    }
}