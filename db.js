const sequelize=require('sequelize');



let connection= new sequelize('user_db','user','password',{
	host:'localhost',
	dialect:'mysql'
});
let User=connection.define('article',{
	name:{
		type:sequelize.STRING,
		unique:true
	},
	password:{
		type:sequelize.STRING
	}
});
let a=(user)=>{
	connection
	.sync({
		logging:console.log("logged")
	})
	.then(()=>{
		User.create({
			name:user.email,
			password:user.pwd

		})
	})
	.catch((err)=>{
		console.log("Error creating database");
	});
	return true;
}


module.exports.a=a;
