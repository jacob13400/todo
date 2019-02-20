const sequelize=require('sequelize');

let connection= new sequelize('user_db','user','password',{
	host:'localhost',
	dialect:'mysql'
});

let User=connection.define('users',{
	name:{
		type:sequelize.STRING,
	},
	password:{
		type:sequelize.STRING,
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
		console.log(task);
		Todo.update({
			completed: task.toggle
		},{
			where: {
				id: task.id
			}
		}).then(() => {
			return result(null);
		}).catch((error) => {
			return result(error.message)
		});
	},
	getTasks: (userid, result) => {
		Todo.findAll({
			where: {
				userid: userid
			}
		}).then((res) => {
			return result(res);
		}).catch((error) => {
			console.log(error);
		})
	},
	deleteTask: (task, result) => {
		Todo.destroy({
			where: {
				id: task.id
			}
		}).then(() => {
			return result(null);
		}).catch((error) => {
			console.log(error);
		})
	},
}


module.exports.a=a;
module.exports.User = User;
