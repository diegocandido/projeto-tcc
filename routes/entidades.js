module.exports = function(app) {

  var entidade = app.controllers.entidades;

  app.route('/entidades/larpadilha')
    .get(entidade.index);

  app.route('/entidades/:id').get(entidade.show);
}
