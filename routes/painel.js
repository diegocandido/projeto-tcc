module.exports = function(app) {

	var painel = app.controllers.painel;
	var autenticar = require('../middleware/autenticar');

	app.route('/painel/:id').get(autenticar, painel.index);

}
