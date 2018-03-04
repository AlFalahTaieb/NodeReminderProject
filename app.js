const express = require('express');
// const path = require('path');
const exphbs  = require('express-handlebars');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');

const app = express();

// Load routes
const ideas = require('./routes/ideas');
const users = require('./routes/user');

// Passport Config
require('./config/passport')(passport);




//Map Global Promise 
mongoose.Promise = global.Promise;

//Conntect to mongoose promesse
mongoose.connect('mongodb://localhost/taieb-dev')
.then(()=>console.log('MongoDb Connected ...'))
.catch(err =>console.log(err));




	
// Handlebars Middleware
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//BodyParser
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
//Method OverRide
app.use(methodOverride('_method'))
//middlwr for express session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
  // cookie: { secure: true }
}))
//Passport Middleware 
  app.use(passport.initialize());
  app.use(passport.session());



app.use(flash());

// Global variables
app.use(function(req, res, next){
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

// Index Route
app.get('/', (req, res) => {
  const title = 'Taieb';
  res.render('index', {
    title: title
  });
});

// About Route
app.get('/about', (req, res) => {
	  const title = 'About';
  res.render('about',{
  	title:title
  });
});


//use Routes
app.use('/ideas',ideas);
app.use('/users',users);


const port = 3000;

app.listen(port, () =>{
  console.log(`Server started on port ${port}`);
});