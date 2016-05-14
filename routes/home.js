module.exports = function(app) {

	var home = app.controllers.home;

	app.route('/')
		.get(home.index);

	app.route('/email')
		.get(home.email)
		.post(home.enviar);

	app.route('/logout').get(home.logout);
}
