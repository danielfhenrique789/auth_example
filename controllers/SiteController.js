
exports.Index = function(request,response)
{
	if(!isLogged(request)){
		response.render("index",{error:null});
	}
	else{
		response.json({status: false, msg: "Busca não trouxe nenhum resultado."});
	}
}
exports.Register = function(request,response)
{
	response.render("register");
}
function isLogged(req){
	return req.session && req.session.user;
}