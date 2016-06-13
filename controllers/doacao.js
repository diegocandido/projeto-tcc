module.exports = function(app) {
	var validacao = require('../validacoes/usuarios');
	var Entidade = app.models.entidades;
	var Usuario = app.models.usuarios;

	var DoacaoController = {
		index: function(req, res) {
			var _id = req.params.id;
			Usuario.findById(_id, function(err, dados2) {
				if (err) {
					console.log('Erro');
				}
				Entidade.find(function(err, dados) {
					if (err) {
						res.redirect('/');
					} else {
						res.render('doar/index', {
							lista: dados,
							listar: dados2.doacoes
						});
					}
				});
			});
		},
		post: function(req, res) {
			var _id = req.body._id;
			Usuario.findById(_id, function(err, dados) {
				var contato = req.body.doacoes;
				dados.doacoes.push(contato);
				dados.save(function(err) {
					if (err) {
						res.render('doar/index', {
							model: req.body,
						});
					}
					res.render('doar/sucesso');
				});
			});
		}
	}
	return DoacaoController;
}
