var people = require('./../../models/AddPeople/people');
var ControllerName = "people";

exports.Add = function(request,response)
{
	request.rules(ControllerName,"List",'logged',function(error){
		if(error){
			response.json("Erro ao Listar pessoas. "+error);
		}
		else{
			var PersonModel = new people(request.body);
			PersonModel.save(function(err,person)
			{
				var res;
				if(err){
					res = {status: false, msg: "Erro ao adicionar pessoa. Erro: "+err};
				}
				else{
					res = {status: true, msg: "Pessoa adicionada com sucesso!"};
				}
				response.json(res);
			});
		}		
	});	
}

exports.List = function(request,response)
{
	request.rules(ControllerName,"List",'logged',function(error){

      console.log(error);
		if(error){
			response.json({status:false,msg:"Erro ao Listar pessoas. "+error});
		}
		else{
			people.find({},{"user.password":0},function(err,data){
				var res;
				if(err){
					res = {status: false, msg: "Erro ao Listar pessoas"};
				}
				else{
					res = {status: true, result: data};
				}
				response.json(res);
			});
		}
	});
}