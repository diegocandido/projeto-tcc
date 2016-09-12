module.exports = function(app) {
	var validacao = require('../validacoes/usuarios');
	var Usuario = app.models.usuarios;
	var Doacao = app.models.doacao;
	var nodemailer = require('../node_modules/nodemailer');

	var UsuarioController = {
		index: function(req, res) {
			Usuario.find()
				.populate('Doacao')
				.exec(function(err, dados) {
					if (err) {
						req.flash('erro', 'Erro ao buscar usuários: ' + err);
						res.redirect('/usuarios');
					} else {
						res.render('usuarios/index', {
							lista: dados
						});
					}
				});
		},

		create: function(req, res) {
			res.render('usuarios/create', {
				user: new Usuario()
			});
		},

		post: function(req, res) {
			if (validacao(req, res)) {
				var model = new Usuario();
				model.nome = req.body.nome;
				model.cpf = req.body.cpf;
				model.endereco = req.body.endereco;
				model.numero = req.body.numero;
				model.complemento = req.body.complemento;
				model.bairro = req.body.bairro;
				model.cep = req.body.cep;
				model.cidade = req.body.cidade;
				model.email = req.body.email;
				model.uf = req.body.uf;
				model.valortotal = 0;
				model.telefone = req.body.telefone;
				model.password = model.generateHash(req.body.password);
				Usuario.findOne({
					'email': model.email
				}, function(err, data) {
					if (data) {
						req.flash('erro', 'E-mail encontra-se cadastrado, tente outro.');
						res.render('usuarios/create', {
							user: model
						});
					} else {
						model.save(function(err) {
							if (err) {
								req.flash('erro', 'Erro ao cadastrar: ' + err);
								res.render('usuarios/create', {
									user: req.body
								});
							} else {
								var transport = nodemailer.createTransport("SMTP", {
									host: "smtp.gmail.com",
									port: 587,
									auth: {
										user: "diego@diegocandido.com",
										pass: "Diego650121"
									}
								});
								var mailOptions = {
									from: "diego@diegocandido.com",
									to: model.email + " <" + model.email + ">",
									subject: "Destina IR: Cadastro Efetuado com Sucesso!",
									html: '<b> Prezado(a),</b><br><br>Seu cadastro foi efetuado com SUCESSO!<br><br>Podemos começar, para efetuar sua doação <a href="https://comdica.herokuapp.com/login">CLIQUE AQUI</a><br><br>Caso deseje saber mais sobre o processo e o funcionamento <a href="https://comdica.herokuapp.com/legislacao">CLIQUE AQUI<br><br>Se desejar saber por que doar <a href="https://comdica.herokuapp.com/doar">CLIQUE AQUI <br><br>Ficamos a disposição<br><br>Equipe Destina IR<br><br>',
									alternatives: [{
										contentType: 'text/x-web-markdown',
										content: '**Hello world!**'
									}]
								}
								transport.sendMail(mailOptions, function(err, response) {
									if (err) {} else {}
								});
								var id = model._id;
								req.session.usuario = model;
								res.redirect('/doar/index/' + id);
							}
						});
					}
				});
			} else {
				req.session.usuario = data;
				res.render('/doar/index', {
					user: req.body
				});
			}
		},
		show: function(req, res) {
			var _id = req.params.id;
			Usuario.findById(_id, function(err, dados) {
				Doacao.findOne({
					'_idusuario': _id
				}, function(err, dados2) {
					res.render('usuarios/show', {
						dados: dados,
						listar: dados2,
						id: _id
					});
				});
			});
		},

		delete: function(req, res) {
			Usuario.remove({
				_id: req.params.id
			}, function(err) {
				if (err) {
					req.flash('erro', 'Erro ao excluir usuário: ' + err);
					res.redirect('/usuarios');
				} else {
					req.flash('info', 'Registro excluído com sucesso!');
					res.redirect('/usuarios');
				}
			});
		},

		edit: function(req, res) {
			var _id = req.params.id;
			Usuario.findById(_id, function(err, data) {
				if (err) {
					req.flash('erro', 'Erro ao editar: ' + err);
					res.redirect('/usuarios');
				} else {
					res.render('usuarios/edit', {
						dados: data
					});
				}
			});
		},

		update: function(req, res) {
			if (validacao(req, res)) {
				Usuario.findById(req.params.id, function(err, data) {
					var model = data;
					model.nome = req.body.nome;
					model.site = req.body.site;
					model.save(function(err) {
						if (err) {
							req.flash('erro', 'Erro ao editar: ' + err);
							res.render('usuarios/edit', {
								dados: model
							});
						} else {
							req.flash('info', 'Registro atualizado com sucesso!');
							res.redirect('/usuarios');
						}
					});
				});
			} else {
				res.render('usuarios/edit', {
					user: req.body
				});
			}
		},
		senha: function(req, res) {
			Usuario.findById(req.params.id, function(err, data) {
				var model = data;
				var validasenha = model.validasenha;
				model.save(function(err) {
					if (validasenha == 1) {
						res.render('senha/mudar', {
							dados: data
						});
					} else {
						res.redirect('/login');
					}
				});
			});
		},
		atualizarsenha: function(req, res) {
			Usuario.findById(req.params.id, function(err, data) {
				var model = data;
				model.validasenha = "0";
				model.password = model.generateHash(req.body.senha);
				model.save(function(err) {
					if (err) {
						console.log('Erro');
					} else {
						var id = model._id;
						req.session.usuario = data;
						res.redirect('/doar/index/' + id);
					}
				});
			});
		},
		novasenha: function(req, res) {
			var cpf = req.body.cpf;
			Usuario.findOne({
				'cpf': cpf
			}, function(err, data) {
				if (data) {
					var model = data;
					model.validasenha = "1";
					model.password = model.generateHash("987654");
					model.save(function(err) {
						if (err) {} else {
							var transport = nodemailer.createTransport("SMTP", {
								host: "smtp.gmail.com",
								port: 587,
								auth: {
									user: "diego@diegocandido.com",
									pass: "Diego650121"
								}
							});
							var mailOptions = {
								from: "diego@diegocandido.com",
								to: model.email + " <" + model.email + ">",
								subject: "Esqueci minha senha",
								html: '<b> Prezado(a),</b><br><br>Sua senha foi alterada para: 987654<br><br>Para modificar a senha, <a href="https://comdica.herokuapp.com/login">CLIQUE AQUI</a><br><br>Ficamos a disposição<br><br>Equipe Destina IR<br><br>',
								alternatives: [{
									contentType: 'text/x-web-markdown',
									content: '**Hello world!**'
								}]
							}
							transport.sendMail(mailOptions, function(err, response) {
								if (err) {} else {}
							});
						}
					});
					req.flash('info', 'Foi enviado instruções para acessar: ' +
						model.email);
					res.render('senha/esqueci');
				} else {
					req.flash('erro', 'E-mail não encontrado.');
					res.render('senha/esqueci');
				}
			});
		},
		esqueci: function(req, res) {
			res.render('senha/esqueci');
		}
	}
	return UsuarioController;
}
