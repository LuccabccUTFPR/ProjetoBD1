var express = require('express');
var router = express.Router();

router.get('/:id', function(req, res, next) {
	if(req.session.usuario){
		var id = req.params.id;
		db.query("select * from USUARIOS AS U, TELEFONES AS T, USUARIO_EMAIL AS UE where U.login = '"+ req.session.usuario +"' AND T.usuario = U.login AND UE.login = T.usuario;", function(errusUsuario, resultsUsuario){
			db.query("SELECT * FROM ATIVIDADES WHERE id_projeto = '"+ id +"';",function(errAtividades, resultsAtividades){
				console.log('\n\n\n\n\n\n\n\n');
				console.log(resultsAtividades);
				console.log('\n\n\n\n\n\n\n\n');
				res.render('projeto',{
					login: req.session.usuario,
					nome: req.session.nome,
					senha: resultsUsuario[0].senha,
			  		telefone: resultsUsuario[0].fone,	
			  		email: resultsUsuario[0].end_email,
					id: req.params.id,
					atividades: resultsAtividades
				});
			});		
		});
	}else{
		res.redirect('/login');
	}
});

router.post('/criarProjeto', function(req, res, next){
	var body = req.body;

	var sql = "INSERT INTO PROJETO VALUES (NULL, '"+ body.titulo +"', '"+ body.descricao +"', '"+ req.session.usuario +"', NULL);"
	db.query(sql, function(err, results){
		res.redirect('../index');
	});
});

router.post('/deletarProjeto', function(req, res, next){
	var body = req.body;
	var sql = "DELETE FROM PROJETO WHERE id_projeto = '"+ body.id +"';"
	db.query(sql, function(err, results){
		res.redirect('../index');
	});
});

router.post('/editarProjeto', function(req, res, next){
	var body = req.body;
	var sql = "UPDATE PROJETO SET titulo = '"+ body.titulo +"', descricao = '"+ body.descricao +"' WHERE id_projeto = '"+ body.id +"';"
	db.query(sql, function(err, results){
		res.redirect('../index');
	});
});

router.post('/:id/criarAtividade', function(req, res, next){
	var body = req.body;
	var sql = "INSERT INTO ATIVIDADES VALUES (NULL, '"+ body.titulo +"', '"+ body.descricao +"', curdate(), NULL, '"+ body.dataFim +"', '"+ req.params.id +"', '"+req.session.usuario+"');"
	db.query(sql, function(err, results){
		res.redirect('../../projeto/' + req.params.id);
	});
});

router.post('/:id/deletarAtividade', function(req, res, next){
	var body = req.body;
	var sql = "DELETE FROM ATIVIDADES WHERE id_atividade = '" + body.id + "';"
	db.query(sql, function(err, results){
		res.redirect('../../projeto/' + req.params.id);
	});
});

router.post('/:id/alterarAtividade', function(req, res, next){
	var body = req.body;
	var sql = "UPDATE ATIVIDADES SET titulo = '" + body.titulo + "', descricao = '" + body.descricao + "', data_inicio = '" + body.DataInicio + "', data_fim = '" + body.DataFim + "' WHERE id_atividade = '"+ body.id +"';"
	db.query(sql, function(err, results){
		res.redirect('../../projeto/' + req.params.id);
	});
});



module.exports = router;