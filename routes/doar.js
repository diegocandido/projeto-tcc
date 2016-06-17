module.exports = function(app) {

	var doar = app.controllers.doacao;
	var autenticar = require('../middleware/autenticar');

	app.route('/doar/index/:id').get(autenticar, doar.index);

	app.route('/doar/sucesso/:id').post(autenticar, doar.sucesso);

}
