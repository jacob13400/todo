const express=require('express');
const hbs=require('hbs');
const sequelize=require('sequelize');
const bodyParser=require('body-parser');
const db=require('./db');

let app= express();

app.set('view engine','hbs');
hbs.registerPartials(__dirname+'/views/partials');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/action',(req,res)=>{	
		// if(db.a.createUser(req.body)){
		// 	res.redirect('/login');
		// }
		db.a.createUser(req.body, (error) => {
			if (!error) {
				res.redirect('/login');
			} else {
				console.log(error);
			}
		});
});
app.get('/signup',(req,res)=>{
	res.render('signup.hbs')
})
app.get('/login',(req,res)=>{
	res.render('login.hbs')
})
app.get('/todo',(req,res)=>{
	res.render('todo.hbs')
})
app.post('/todo', (req,res) => {
	db.a.addTask(req.body, (error) => {
		if (!error) {
			res.redirect('/todo');
		} else {
			console.log(error);
		}
	});
})
app.listen(3000);



