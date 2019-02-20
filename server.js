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

app.post('/signup',(req,res)=>{	
		const email = req.body.email
		const password = req.body.password
		let errors = []

		if(!email || !password) {
			errors.push('Please fill out all the fields');
		}

		if (errors.length > 0) {
			res.render('signup.hbs', {
				errors: errors
			});
		} else {
			db.User.findOne({
				where: {
					name: email
				}
			}).then((result) => {
				if (result) {
					errors.push('Email already exists!');
					console.log(result)
					res.render('signup.hbs', {
						errors: errors
					});
				} else {
						db.User.create({
							name: email,
							password:password
						}).then(() => {
							res.redirect('/login')
						}).catch((err) => {
							console.log(err);
						});
				}
			}).catch(err => {
				console.log(err);
			});
		}
		
});
app.get('/signup',(req,res)=>{
	res.render('signup.hbs')
});

app.get('/login',(req,res)=>{
	res.render('login.hbs')
});

app.post('/login',(req,res)=>{	
	const email = req.body.email
	const password = req.body.password
	let errors = []

	if(!email || !password) {
		errors.push('Please fill out all the fields');
	}

	if (errors.length > 0) {
		res.render('login.hbs', {
			errors: errors
		});
	} else {
		db.User.findOne({
			where: {
				name: email
			}
		}).then((result) => {
			if (result) {
				if (result.dataValues.password != password) {
					errors.push('Incorrect password.');
					res.render('login.hbs', {
						errors: errors
					});	
				} else {
					// set session
					// redirect
				}
			} else {
				errors.push('That user is not found.');
				res.render('login.hbs', {
					errors: errors
				});
			}
		}).catch(err => {
			console.log(err);
		});
	}
	
});

app.get('/todo',(req,res)=>{
	db.a.getTasks(1, (result) => {
		res.render('todo.hbs', {"result": result})
	});
});

app.post('/todo', (req,res) => {
	db.a.addTask(req.body, (error) => {
		if (!error) {
			res.redirect('/todo');
		} else {
			console.log(error);
		}
	});
});

app.get('/todo/toggle/:id/:toggle', (req, res) => {
	db.a.toggleTask({id: req.params.id , toggle:req.params.toggle}, (result) => {
		res.redirect('/todo');
	})
});

app.get('/todo/delete/:id', (req, res) => {
	db.a.deleteTask({id: req.params.id}, (result) => {
		res.redirect('/todo');
	})
});

app.listen(3000);



