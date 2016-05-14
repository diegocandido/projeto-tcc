module.exports = function(app) {

	var doar = app.controllers.doacao;
	var autenticar = require('../middleware/autenticar');

	app.route('/doar/index').get(autenticar, doar.index);

}
