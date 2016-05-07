var Site = require("./controllers/SiteController");
var User = require("./controllers/UserController");
var People = require("./controllers/AddPeople/PeopleController");

module.exports = function(app){
	app.get('/',Site.Index);
	app.get('/register',Site.Register);	
	app.post('/register',User.Register);
	app.get('/authenticate',Site.Index);
	app.post('/authenticate',User.Authenticate);
	app.get('/logout',User.Logout);
	app.post('/api/pessoas/add',People.Add);
	app.get('/api/pessoas/list',People.List);
}