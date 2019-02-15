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
		if(db.a(req.body)){
			res.redirect('/login');
		}
});
app.get('/signup',(req,res)=>{
	res.render('signup.hbs')
})
app.get('/login',(req,res)=>{
	res.render('login.hbs')
})
app.listen(3000);


