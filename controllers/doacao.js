module.exports = function(app) {
	var validacao = require('../validacoes/usuarios');
	var Entidade = app.models.entidades;
	var Doacao = app.models.doacao;

	var DoacaoController = {
		index: function(req, res) {
			Entidade.find(function(err, dados) {
				if (err) {
					res.redirect('/');
				} else {
					res.render('doar/index', {
						lista: dados
					});
				}
			});
		},
		post: function(req, res) {
			var model = new Doacao();
			model._usuario = req.body._usuario;
			model._entidades = req.body._entidades;
			model.valordoado = req.body.valordoado;
			model.save(function(err) {
				if (err) {
					req.flash('erro', 'Erro ao cadastrar: ' + err);
					res.render('doar/index');
				} else {
					res.render('doar/sucesso');
				}
			});
		},
		sucesso: function(req, res) {
			res.render('doar/sucesso');
		},
	}
	return DoacaoController;
}
