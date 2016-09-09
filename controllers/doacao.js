module.exports = function(app) {
	var validacao = require('../validacoes/usuarios');
	var Entidade = app.models.entidades;
	var Usuario = app.models.usuarios;
	var Doacao = app.models.doacao;

	var DoacaoController = {
		index: function(req, res) {
			var _id = req.params.id;
			Doacao.find({
				'_idusuario': _id
			}, function(err, dados2) {
				if (err) {
					console.log('Erro');
				}
				Entidade.find(function(err, dados) {
					if (err) {
						console.log('Erro');
					}
					res.render('doar/index', {
						lista: dados,
						listar: dados2,
						id: _id
					});
				});
			});
		},
		sucesso: function(req, res) {
			var id = req.body._idusuario;
			var model = new Doacao();
			model.status = "Aguardando Confirmação";
			model.valordoado = req.body.valordoado;
			model.beneficiaria = req.body.beneficiaria;
			model._identidade = req.body._identidade;
			model._idusuario = id;
			var valor = req.body.valordoado;
			model.save(function(err) {
				if (err) {
					res.render('/');
				} else {
					Usuario.findOne({
						'_id': id
					}, function(error, dados) {
						Doacao.findOne({
								'_idusuario': id
							},
							function(err, dados1) {
								if (err) {
									res.redirect('/');
								} else {
									res.render('doar/boleto', {
										dados: dados,
										dados1: dados1
									});
								}
							});
					});
				}
			});
		},
		excluir: function(req, res) {
			var _id = req.params.amigo;
			Usuario.findById(_id, function(err, dados) {
				if (err) {
					res.json(400, 'Erro ao excluir contato: ' + err);
				}
				var contatoID = req.params.id;
				dados.doacoes.id(contatoID).remove();
				dados.save(function(err) {
					if (err) {
						res.json(400, 'Erro ao excluir contato: ' + err);
					}
					res.json(200, 'Registro excluído com sucesso!');
				});
			});
		},
		atualizar: function(req, res) {
			var _id = req.params.doacao;
			var _idusuario = req.params.usuario;
			var valor = req.params.valor;
			Usuario.findById(_idusuario, function(err, dados1) {
				var total = Number(dados1.valortotal) + Number(valor);
				var model1 = dados1;
				model1.valortotal = total;
				model1.save(function(err) {
					if (err) {
						console.log('Erro Usuario');
					}
				});
			});
			Doacao.findById(_id, function(err, dados) {
				var _identidade = dados._identidade;
				var model = dados;
				model.status = "Doação Confirmada";
				model.validacao = "1";
				model.save(function(err) {
					if (err) {
						console.log('Erro Doacao');
					}
				});
				Entidade.findById(_identidade, function(err, dados2) {
					var model2 = dados2;
					var totalentidades = Number(dados2.valortotal) + Number(valor);
					model2.valortotal = totalentidades;
					model2.save(function(err) {
						if (err) {
							res.json(400, 'Erro ao confirmar o valor: ' + err);
						}
						res.json(200, 'Valor confirmado com sucesso!');
					});
				});
			});
		},
		lista: function(req, res) {
			Doacao.find(function(err, dados) {
				if (err) {
					res.redirect('/');
				} else {
					res.render('doacoes/index', {
						lista: dados
					});
				}
			});
		},
		valor: function(req, res) {
			var _id = req.params.id;
			Entidade.findById(_id, function(err, dados) {
				if (err) {
					console.log(dados);
				}
				res.render('doar/valor', {
					lista: dados
				});
				console.log(dados);
			});
		}
	}
	return DoacaoController;
}
