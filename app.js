const express = require('express');
const exphbs  = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

const methodOverride = require('method-override')

//Map Global Promise 
mongoose.Promise = global.Promise;

//Conntect to mongoose promesse
mongoose.connect('mongodb://localhost/taieb-dev')
.then(()=>console.log('MongoDb Connected ...'))
.catch(err =>console.log(err));

//Load Ideas Model

require('./models/Ideas');
const Idea = mongoose.model('ideas');


	
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

//Idea Index Page
app.get('/ideas',(req,res)=>{
	Idea.find({})
	.sort({date:'desc'})
	.then(ideas=>{
		res.render('ideas/index',{
			ideas:ideas
		});
	});

});



//Delete Idea

app.delete('/ideas/:id',(req,res)=>{
Idea.remove({_id:req.params.id})
.then(()=>{
	res.redirect('/ideas');
});
});


//Add Idea Form

app.get('/ideas/add',(req,res)=>{
	res.render('ideas/add');
});

//Edit Process 

app.put('/ideas/:id',(req,res)=>{
Idea.findOne({
	_id:req.params.id
})
.then(idea=>{
	//New Value
	idea.title = req.body.title;
	idea.details = req.body.details;
	idea.save()
		.then(idea=>{
			res.redirect('/ideas');
		})
})
})


// Edit Idea Form

app.get('/ideas/edit/:id',(req,res)=>{
	Idea.findOne({
		_id:req.params.id
	})
	.then(idea=>{
			res.render('ideas/edit',{
		idea:idea
	});
	});

});



//Procss Form

app.post('/ideas',(req,res)=>{
let errors=[];
if (!req.body.title){
	errors.push({text:'Please Add a title'});
}
if (!req.body.details){
	errors.push({text:'Please add some details'});
}
if(errors.length>0){
	res.render('ideas/add',{
	errors:errors,
	title:req.body.title,
	details:req.body.details
	});
   } else{
   	const newUser = {
   		title:req.body.title,
   		details:req.body.details
   	}
  new Idea(newUser)
  		.save()
  		.then(idea=>{
  			res.redirect('/ideas');
  		})
   }
});



const port = 3000;

app.listen(port, () =>{
  console.log(`Server started on port ${port}`);
});