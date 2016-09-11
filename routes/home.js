module.exports = function(app) {

	var home = app.controllers.home;

	app.route('/')
		.get(home.index);

	app.route('/sobre')
		.get(home.sobre);

	app.route('/comodoar')
		.get(home.comodoar);

	app.route('/obrigado')
		.get(home.obrigado);

	app.route('/legislacao')
		.get(home.legislacao);

	app.route('/doar')
		.get(home.doar);

	app.route('/logout').get(home.logout);
}
