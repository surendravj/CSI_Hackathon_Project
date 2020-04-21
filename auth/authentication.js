const strategy = require('passport-local').Strategy
const user = require('../models/user');


module.exports = (passport) => {
    passport.use(
        new strategy({
            usernameField: 'email'
        }, (email, password, done) => {
            user.findOne({ email: email })
                .then(data => {
                    if (data) {
                        if (password == data.password) 
                        {  
                            return done(null, data);
                        }
                        else {
                            return done(null, false, { message: 'Invalid email or password' });
                        }
                    } else {
                        return done(null, false, { message: 'Account not exist' });
                    }
                })
                .catch(e =>
                    console.log(e)
                )
        })
    )
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        user.findById(id, function (err, user) {
            done(err, user);
        });
    });
}