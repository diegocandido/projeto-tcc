module.exports = function(app) {
  var validacao = require('../validacoes/usuarios');

  var PainelController = {
    index: function(req, res) {
      res.render('painel/index');
    }
  }
  return PainelController;
}
