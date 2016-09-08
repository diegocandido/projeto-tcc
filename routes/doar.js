module.exports = function(app) {

	var doar = app.controllers.doacao;
	var autenticar = require('../middleware/autenticar');

	app.route('/doar/index').get(autenticar, doar.index);

	app.route('/doar/valor/:id').get(autenticar, doar.valor);

	app.route('/doar/boleto').post(autenticar, doar.sucesso);

	app.route('/doar/sucesso/delete/:id/:amigo').post(autenticar, doar.excluir);

	app.route('/doar/sucesso/atualizar/:id/:amigo').post(autenticar, doar.atualizar);

}
