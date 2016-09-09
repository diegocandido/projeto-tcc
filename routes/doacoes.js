module.exports = function(app) {

	var doacao = app.controllers.doacao;
	var autenticar = require('../middleware/autenticar');

	app.route('/doacoes').get(autenticar, doacao.lista);

	app.route('/doacoes/confirmar/:doacao/:usuario/:valor').post(doacao.atualizar);
}
