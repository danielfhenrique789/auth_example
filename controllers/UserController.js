var users = require('./../models/AddPeople/people');
var bcrypt = require('bcryptjs');

exports.Authenticate = function(request,response)
{	
	if(request.session && request.session.user)
	{
		response.json({status: true, msg: "Usuário já se encontra logado."});
	}
	else
	{
		users.findOne({"user.username": request.body.email},function(err,user){
		var msgErrorLogin = "Email ou senha inválido.";
			if(err){
				console.log("Erro ao logar: "+err);
			}
			if(!user){
				response.render("index",{error: msgErrorLogin});			
			}
			else{
				if(bcrypt.compareSync(request.body.password,user.user.password)){
					request.session.reset();
					user.user.last_access = Date.now();
					user.save(function(error,user){
						request.session.user = user;
						response.json({status: true, msg: "Usuário Logado com sucesso."});
					});
				}
				else{
					response.render("index",{error: msgErrorLogin});
				}
			}		
		});
	}
}

exports.Logout = function(request,response)
{
	console.log("logout");
	request.session.reset();
	response.redirect('/');
}

exports.Register = function(request,response)
{
	var model = getUserModel(new users,request);
	model.save(function(error,user){
		if(error){
			console.log("Erro ao salvar registro: "+error);
			response.redirect("/register");
		}
		else{
			setUserSession(request,user);
			response.json({status: true, msg: "Usuário inserido com sucesso."});
		}
	});
}

function getUserModel(users,request)
{
	users.name = request.body.name;
	users.emails = [request.body.email];
	var hash = bcrypt.hashSync(request.body.senha,bcrypt.genSaltSync(10));
	users.user.username = request.body.email;
	users.user.password = hash;
	console.log(users.user.password);
	users.user.last_access = Date.now();
	return users;
}
