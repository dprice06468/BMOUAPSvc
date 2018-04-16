var express = require('express');
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');
ver connection = new Sequelize('uap', null, null,{
	dialect: "sqlite",
	storage: "./uap.sqlite"
});

var app = express();
var PORT = process.env.PORT || 3000;
var todoNextId = 4;

var todos = [{
	id: 1,
	description: 'Meet mom for lunch',
	completed: false
}, {
	id: 2,
	description: 'Go to market',
	completed: false
}, {
	id: 3,
	description: 'Feed the cat',
	completed: true
}];

var uaps = [{
	userid: 'user1',
	application: 'app1',
	role: 'role1',
	profile: {
		userAttribs: {
			email: 'myemail@me.com',
			age: 25
		},
		userFunctions: [{
			functionName: 'func1',
			securityLevel: '99'
		}, {
			functionName: 'func2',
			securityLevel: '1'
		}, {
			functionName: 'func3',
			securityLevel: '0'
		}]
	}
}, {
	userid: 'user2',
	application: 'app1',
	role: 'role2',
	profile: {
		userAttribs: {
			email: 'myemail2@me.com',
			age: 35
		},
		userFunctions: [{
			functionName: 'func1',
			securityLevel: '0'
		}, {
			functionName: 'func2',
			securityLevel: '99'
		}, {
			functionName: 'func3',
			securityLevel: '1'
		}]
	}
}];

app.use(bodyParser.json());

app.get('/', function(req, res) {
	res.send('UAP API Root');
});

// GET /todos
app.get('/todos', function (req, res) {
	res.json(todos);
});

// GET /todos/:id
app.get('/todos/:id', function (req, res) {
	var todoId = parseInt(req.params.id, 10);
	var matchedTodo;

	todos.forEach(function (todo) {
		if (todoId === todo.id) {
			matchedTodo = todo;
		}
	});

	if (matchedTodo) {
		res.json(matchedTodo);
	} else {
		res.status(404).send();
	}
});

// GET /UAP
app.get('/UAP', function (req, res) {
	res.json(uaps);
});

// GET /uaps/:userid
app.get('/UAP/:userid', function (req, res) {
	var userId = req.params.userid;
	var matchedUAP;

	uaps.forEach(function (uap) {
		if (userId === uap.userid) {
			matchedUAP = uap;
		}
	});

	if (matchedUAP) {
		res.json(matchedUAP);
	} else {
		res.status(404).send();
	}
});

// POST /UAP
app.post('/UAP', function (req, res) {
	var body = req.body;

	// add id field
	//body.userid = todoNextId++;

	// push body into array
	uaps.push(body);
	
	res.json(body);
});

// POST /todos
app.post('/todos', function (req, res) {
	var body = req.body;

	// add id field
	body.id = todoNextId++;

	// push body into array
	todos.push(body);
	
	res.json(body);
});

app.listen(PORT, function () {
	console.log('UAP Service listening on port ' + PORT + '!');
});

