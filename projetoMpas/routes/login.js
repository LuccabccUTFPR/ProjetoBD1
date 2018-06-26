var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', {
  	message: null
  });
});

router.post('/', function(req, res, next) {
	var body = req.body;
	var sql = "SELECT * FROM USUARIOS WHERE login = '"+body.login+"' and senha = '"+ body.senha +"';"
	db.query(sql, function(err, rows, fields){
		if(err){
			console.log("erro: "+ err);
			res.rendirect('/');
			return;

		}else if(rows.length > 0){
			if(rows[0].login == body.login && rows[0].senha == body.senha){
				req.session.usuario = body.login;
				req.session.nome = rows[0].nome_usuario;
				res.redirect('index');
				return;
			}
		}else{
			res.render('login', {
				message: "usuario nao cadastrado"
			});
		}
	});

});

module.exports = router;
