module.exports = function(app) {

	var doar = app.controllers.doacao;
	var autenticar = require('../middleware/autenticar');

	app.route('/doar/index/:id').get(autenticar, doar.index);

	app.route('/doar/boleto').post(doar.sucesso);

	app.route('/doar/sucesso/delete/:id/:amigo').post(autenticar, doar.excluir);

	app.route('/doar/sucesso/atualizar/:id/:amigo').post(autenticar, doar.atualizar);

}
