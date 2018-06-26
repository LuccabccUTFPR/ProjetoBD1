var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('Cadastro', {});
});

router.post('/', function(req, res, next) {
	var body = req.body;

	var sql = "INSERT INTO USUARIOS VALUES ('"+body.login+"', '"+ body.nome +"', '"+ body.senha +"');"
	var sql1 = "INSERT INTO EMAILS VALUES ('"+body.email+"');"
	var sql2 = "INSERT INTO USUARIO_EMAIL VALUES ('"+body.login+"','"+body.email+"');"
	var sql3 = "INSERT INTO TELEFONES VALUES ('"+body.telefone+"', '"+body.login+"');"
	db.query(sql, function(err, results){
		if(err){
			res.render('Cadastro',{
				erro: "Usuário já Cadastrado"
			});
			return;
		}
		db.query(sql1, function(err1,results1){
			db.query(sql2, function(err2,results2){
				db.query(sql3, function(err3,results3){
					req.session.usuario = body.login;
					req.session.nome = body.nome;
					res.redirect('index');
				});
			});
		});	
	});
});






module.exports = router;
