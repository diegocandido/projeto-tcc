module.exports = function(app) {

	var usuario = app.controllers.usuarios;
	var autenticar = require('../middleware/autenticar');

	app.route('/usuarios').get(autenticar, usuario.index);

	app.route('/usuarios/create')
		.get(usuario.create)
		.post(usuario.post);

	app.route('/usuarios/show/:id').get(autenticar, usuario.show);
	app.route('/usuarios/delete/:id').post(usuario.delete);

	app.route('/usuarios/edit/:id')
		.get(autenticar, usuario.edit)
		.post(autenticar, usuario.update);

	app.route('/senha/mudar/:id')
		.get(usuario.senha)
		.post(usuario.atualizarsenha);

	app.route('/senha/esqueci')
		.post(usuario.novasenha).get(usuario.esqueci);
}
