var Sequelize = require('sequelize');
var connection = new Sequelize('uap', null, null,{
	dialect: "sqlite",
	storage: "./uap.sqlite"
});

var Application = connection.define('Application', {
	name: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			len: [3,50]
		}
	},
	active: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false
	}
});

var Functionality = connection.define('Functionality', {
	name: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			len: [3, 50]
		}
	},
	active: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false
	}
});

var Role = connection.define('Role', {
	name: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			len: [3, 50]
		}
	},
	active: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false
	}
});

var User = connection.define('User', {
	userId: {
		type: Sequelize.STRING,
		primaryKey: true,
		allowNull: false,
		validate: {
			len: [8,20]
		}
	},
	lastName: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			len: [1, 50]
		}
	},
	firstName: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			len: [1, 50]
		}
	},
	active: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false
	}
});

var UserRole = connection.define('UserRole', {
	audit: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false
	}
});

var RoleFunctionality = connection.define('RoleFunctionality', {
	securityLevel: {
		type: Sequelize.STRING,
		allowNull: false,
		defaultValue: '99'
	}
})
Application.hasMany(Functionality);
Application.hasMany(Role);
Role.belongsToMany(User, {through: 'UserRole'});
User.belongsToMany(Role, {through: 'UserRole'});
Role.belongsToMany(Functionality, {through: 'RoleFunctionality'});
Functionality.belongsToMany(Role, {through: 'RoleFunctionality'});

connection.sync().then(function () {
	console.log('everything is synced');
	
	//Application.create({
	//	name: 'testapp',
	//	active: true,
	//	Functionalities: [{
	//		name: 'func1',
	//		active: true
	//	},{
	//		name: 'func2',
	//		active: true
	//	}]
	//}).then(function(application) {
	//	console.log('app creation complete');
	//	console.log(application);
	//}).catch(function(e) {
	//	console.log(e);
	//});
	
	//Functionality.create({
	//	name: 'func1',
	//	active: true
	//});
	
	//Role.create({
	//	name: 'role',
	//	active: true
	//});
	
	//User.create({
	//	userId: 'dprice08',
	//	firstName: 'Dave',
	//	lastName: 'Price',
	//	active: true
	//});

	console.log('findById:');
	var apps = Application.findById(1).then(function(app){
		if (app) {
			console.log(app.toJSON());
		} else {
			console.log('app not found');
		}
	});

	console.log('findAll:');
	var apps = Application.findAll({
		where: {
			active: true
		}
	}).then(function(x){
		x.forEach(function(app){
		if (x) {
			console.log('apps: ' + x.toJSON());
		} else {
			console.log('app not found');
		}
	});
	});
	
});