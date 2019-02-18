const sequelize=require('sequelize');

let connection= new sequelize('user_db','user','password',{
	host:'localhost',
	dialect:'mysql'
});

let User=connection.define('users',{
	name:{
		type:sequelize.STRING,
		unique:true,
		validate:{
			notEmpty: {
				args: true,
				msg: "Username field cannot be empty"
			}
		}
	},
	password:{
		type:sequelize.STRING,
		validate:{
			notEmpty: {
				args: true,
				msg: "Password field cannot be empty"
			}
		}
	}
},{
	freezeTableName: true
});

let Todo=connection.define('todos',{
	userid:{
		type:sequelize.INTEGER,
	},
	task: {
		type: sequelize.TEXT,
	},
	completed: {
		type: sequelize.BOOLEAN,
		defaultValue: false
	}
},{
	freezeTableName: true
});

connection.sync();

let a = {
	createUser: (user, result)=>{
		User.create({
			name:user.email,
			password:user.pwd
		}).then(() => {
			return result(null);
		}).catch((err) => {
			return result(err.message);
		});
		return true;
	},
	addTask: (task, result) => {
		Todo.create({
			userid: 1,
			task: task.task
		}).then(() => {
			return result(null);
		}).catch((error) => {
			return result(error.message)
		});
	},
	toggleTask: (task, result) => {
		Todo.update({
			completed: task.status
		},{
			id: task.id
		}).then(() => {
			return result(null);
		}).catch((error) => {
			return result(error.message)
		});
	}
}


module.exports.a=a;
