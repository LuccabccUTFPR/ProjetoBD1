var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
  	login: undefined,
  	nome: undefined
  });
});

router.get('/login', function(req, res, next) {
  res.render('login', {});
});

router.get('/Cadastro', function(req, res, next) {
  res.render('Cadastro', {});
});

router.post('/excluir', function(req, res, next) {
	var body = req.body;
	var sql = "DELETE FROM USUARIOS WHERE login = '"+ body.login +"';"
	db.query(sql, function(err, results){
		if(err)
		console.log("erro: "+ err);
		res.render('index', {
			login: undefined,
			nome: undefined
		});
	});

});


module.exports = router;
