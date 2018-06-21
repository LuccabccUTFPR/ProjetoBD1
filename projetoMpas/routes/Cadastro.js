var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('Cadastro', {});
});

router.post('/', function(req, res, next) {
	var body = req.body;
	var sql = "INSERT INTO USUARIOS VALUES ('"+body.login+"', '"+ body.nome +"', '"+ body.senha +"');"
	db.query(sql, function(err, results){
		if(err)
		console.log("erro: "+ err);
		res.render('index', {
			login: body.login,
			nome: body.nome
		});
	});

});






module.exports = router;
