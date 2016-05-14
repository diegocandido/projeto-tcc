module.exports = function(app) {
	var validacao = require('../validacoes/usuarios');
	var Entidade = app.models.entidades;
	var Usuario = app.models.usuarios;

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
		}
	}
	return DoacaoController;
}
