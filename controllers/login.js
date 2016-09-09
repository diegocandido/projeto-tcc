module.exports = function(app) {

	var Usuario = app.models.usuarios;
	var Entidade = app.models.entidades;
	var validacao = require('../validacoes/autenticacao');

	var LoginController = {
		index: function(req, res) {
			res.render('login/index');
		},

		autenticacao: function(req, res) {
			var usuario = new Usuario();
			var email = req.body.email;
			var password = req.body.password;

			if (validacao(req, res)) {
				Usuario.findOne({
					'email': email
				}, function(err, data) {
					if (err) {
						req.flash('erro', 'Erro ao entrar no sistema: ' + err);
					} else if (!data) {
						req.flash('erro',
							'E-mail não cadastrado, faça o cadastro abaixo!');
						res.redirect('usuarios/create');
					} else if (!usuario.validPassword(password, data.password)) {
						req.flash('erro', 'Senha não confere!');
						res.redirect('login');
					} else {
						req.session.usuario = data;
						res.redirect('doar/index/' + data._id);
					}
				});
			} else {
				res.redirect('/login');
			}
		},

		create: function(req, res) {
			res.render('login/create', {
				user: new Usuario()
			});
		},

		post: function(req, res) {
			if (validacao(req, res)) {
				var model = new Usuario();
				model.nome = req.body.nome;
				model.email = req.body.email;
				model.site = req.body.site;
				model.password = model.generateHash(req.body.password);

				Usuario.findOne({
					'email': model.email
				}, function(err, data) {
					if (data) {
						req.flash('erro', 'E-mail encontra-se cadastrado, tente outro.');
						res.render('login/create', {
							user: model
						});
					} else {
						model.save(function(err) {
							if (err) {
								req.flash('erro', 'Erro ao cadastrar: ' + err);
								res.render('login/create', {
									user: req.body
								});
							} else {
								req.flash('info', 'Registro cadastrado com sucesso!');
								res.redirect('/doar');
							}
						});
					}
				});
			} else {
				res.render('doar', {
					user: req.body
				});
			}
		}

	}

	return LoginController;
}
