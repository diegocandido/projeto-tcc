module.exports = function(app) {

	var dashboard = app.controllers.dashboard;
	var autenticar = require('../middleware/autenticar');

	app.route('/dashboard').get(autenticar, dashboard.index);
}
