var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	if(req.session.usuario){
		db.query("select * from USUARIOS AS U, TELEFONES AS T, USUARIO_EMAIL AS UE where U.login = '"+ req.session.usuario +"' AND T.usuario = U.login AND UE.login = T.usuario;",function(err, results){
		  	db.query("select * from PROJETO WHERE gerente = '"+ req.session.usuario+"' and projetoPai is null;", function(errProjeto,resultsProjeto){
			  	res.render('index', {
			  		nome:req.session.nome,
			  		login: results[0].login,
			  		senha: results[0].senha,
			  		telefone: results[0].fone,	
			  		email: results[0].end_email,
			  		projetos: resultsProjeto
			  	});
			  	return;		  		
		  	});
		});
	}else{
	res.redirect('/login');
	}
});

router.get('/index', function(req, res, next) {
	res.redirect('/');
});

router.get('/login', function(req, res, next) {
  res.render('login', {
  	message: null
  });
});

router.get('/Cadastro', function(req, res, next) {
  res.render('Cadastro', {});
});

router.post('/excluir', function(req, res, next) {
	var body = req.body;
	var sql = "SELECT * FROM USUARIOS WHERE login = '"+ body.loginExcluir +"' and senha = '"+ body.senhaExcluir +"';"
	var sql1 = "SELECT end_email FROM USUARIO_EMAIL as ue WHERE ue.login = '"+ body.loginExcluir +"' and 1=(SELECT count(*) from USUARIO_EMAIL as ue2 WHERE ue2.end_email = ue.end_email);"
	var sql2 = "DELETE FROM EMAILS WHERE end_email = "
	var sql3 = "DELETE FROM USUARIOS WHERE login = '"+ body.loginExcluir +"' and senha = '"+ body.senhaExcluir +"';"

	db.query(sql, function(err, results){
		if(err){
			console.log("erro: "+ err);
			res.redirect('index');
		}else if(results.length > 0){

			db.query(sql1, function(err1, results1){
				if(err1){
					console.log("erro: "+ err1);
					res.redirect('index');
				}else if(results1.length > 0){
					var tam = results1.length;
					for(var i = 0; i < tam; i++){
						sql2+= (i == 0) ? ('"' + results1[i].end_email+'"') : (' or end_email ="' + results1[i].end_email+'"');
					}
					sql2 += ";"
					db.query(sql2, function(err2, results2){
						if(err2){
							console.log("erro: "+ err2);
							res.redirect('index');
						}else{
							db.query(sql3, function(err3, results3){
								if(err3){
									console.log("erro: "+ err3);
									res.redirect('index');
								}
								req.session.destroy(function(erro){
									res.redirect('login');
								});
								return;
							});
						}
					});		
				}else{
					db.query(sql3, function(err3, results3){
						if(err3){
							console.log("erro: "+ err3);
							res.render('index',{
								nome:req.session.nome
							});
						}
						req.session.destroy(function(erro){
							res.redirect('login');
						});
						return;
					});
				}	
			});	
		}
	});
});

router.post('/alterar', function(req, res, next){
	var body = req.body;
	sql = "UPDATE USUARIOS SET login = '"+ body.loginAlterar +"', nome_usuario = '"+ body.nomeAlterar +"', senha = '"+ body.senhaAlterar +"' WHERE login = '"+ req.session.usuario +"';"
	db.query(sql,function(err, results){
		if(!err){
			req.session.usuario = body.loginAlterar;
			req.session.nome = body.nomeAlterar;
			res.redirect('/');
		}else{
			console.log(err);
		}
	});
});

router.get('/sair', function(req, res, next){
	req.session.destroy(function(err){
		res.redirect('login');
	});
});

// router.post('/novoProjeto', function(req, res, next) {
// 	var body = req.body;
// 	var sql = "INSERT INTO PROJETO VALUES (NULL, '"+ body.titulo +"', '"+ body.descricao +"', '"  "');"
// 	db.query(sql, function(err, results){
// 		if(err)
// 		console.log("erro: "+ err);
// 		res.render('index', {
// 			login: undefined,
// 			nome: undefined,
// 			message: undefined
// 		});
// 	});

// });


module.exports = router;
