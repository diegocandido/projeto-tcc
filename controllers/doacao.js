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
					Usuario.findById(id, function(error, dados) {
						console.log(dados);
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
								console.log(dados1);
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
				var model1 = dados1;
				model1.valortotal = valor;
				model1.save(function(err) {
					if (err) {
						console.log('Erro ao atualizar valor');
					}
					console.log('Atualizar com sucesso valor');
				});
			});
			Doacao.findById(_id, function(err, dados) {
				var model = dados;
				model.status = "Doação Confirmada";
				model.save(function(err) {
					if (err) {
						res.json(400, 'Erro ao confirmar o valor: ' + err);
						console.log('Erro');
					}
					res.json(200, 'Valor confirmado com sucesso!');
					console.log(valor);
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
			});
		}
	}
	return DoacaoController;
}
