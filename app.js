const path = require('path');
const express = require('express');
const bodyparser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const passport = require('passport');
const app = express();



//modules importing
const auth = require('./routes/public/auth');
require('./auth/authentication')(passport);
const dashboard = require('./routes/private/dashboard');
const mongoUrl = 'mongodb+srv://surendra:surendra14@cluster0-m7gbl.mongodb.net/LMS?retryWrites=true&w=majority'




// middleware configuration
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({ extended: true }));
app.use(session({
    secret: 'Myscreat',
    'resave': true,
    saveUninitialized: true
}))
app.use(flash());
mongoose.connect(mongoUrl, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true }).then(() => {
    console.log('Database is connected');
}).catch(e => console.log(err));
app.use(passport.initialize());
app.use(passport.session());




//static content congif
app.use('/static', express.static(path.join(__dirname, '/public')));





// routings
app.get('/', (req, res) => res.render('index'));
app.use(auth);
app.use(dashboard);




// server and port configuration
let port = process.env.PORT;
if (port == null || port == "") {
    port = 8000;
}
app.listen(port, () => console.log(`server is connected at port ${port}`));
