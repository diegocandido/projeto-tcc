module.exports = function(app) {

  var autenticar = require('../middleware/autenticar');
  var entidade = app.controllers.entidades;

  app.route('/entidades').get(autenticar, entidade.index);

  app.route('/entidades/create')
    .get(autenticar, entidade.create)
    .post(autenticar, entidade.post);

  app.route('/entidades/:id').get(entidade.show);

  app.route('/entidades/edit/:id')
    .get(autenticar, entidade.edit)
    .post(entidade.update);
}
