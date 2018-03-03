const express = require('express');
const exphbs  = require('express-handlebars');
const mongoose = require('mongoose');

const app = express();

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

const port = 3000;

app.listen(port, () =>{
  console.log(`Server started on port ${port}`);
});