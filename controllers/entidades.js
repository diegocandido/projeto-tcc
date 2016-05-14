module.exports = function(app) {

  var Entidade = app.models.entidades;

  var EntidadesController = {
    index: function(req, res) {
      res.render('entidades/larpadilha');
    },
    show: function(req, res) {
      Entidade.findById(req.params.id, function(err, dados) {
        if (err) {
          res.redirect('/');
        } else {
          res.render('entidades/show', {
            dados: dados
          });
        }
      });
    },
  }

  return EntidadesController;
}
