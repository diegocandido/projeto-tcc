module.exports = function(app) {

	var login = app.controllers.login;
	var autenticar = require('../middleware/autenticar');

	app.route('/login')
		.get(login.index)
		.post(login.autenticacao);

	app.route('/login/create')
		.get(login.create)
		.post(login.post);

}
