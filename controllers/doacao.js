module.exports = function(app) {
	var validacao = require('../validacoes/usuarios');
	var Entidade = app.models.entidades;
	var Usuario = app.models.usuarios;
	var Doacao = app.models.doacao;

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
							listar: dados2.doacoes,
							id: _id
						});
					}
				});
			});
		},
		sucesso: function(req, res) {
			var id = req.params.id;
			Usuario.findById(req.params.id, function(err, dados) {
				var contato = req.body.doacoes;
				dados.doacoes.push(contato);
				dados.save(function(err) {
					if (err) {
						res.render('doar/index', {
							model: req.body,
						});
					}
					res.render('doar/sucesso/' + id);
					console.log(dados);
				});
			});
		},
		excluir: function(req, res) {
			var _id = "5764d578da536fc40cc25166";
			Usuario.findById(_id, function(err, dados) {
				if (err) {
					res.json(400, 'Erro ao excluir contato: ' + err);
				}
				var contatoID = "5764d8e2997160dc0c7a7e33";
				dados.doacoes.id(contatoID).remove();
				dados.save(function(err) {
					if (err) {
						res.json(400, 'Erro ao excluir contato: ' + err);
					}
					res.json(200, 'Registro excluído com sucesso!');
				});
			});
		}
	}
	return DoacaoController;
}
