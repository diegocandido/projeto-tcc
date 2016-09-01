module.exports = function(req, res) {

  req.assert('valordoado', 'Informe o valor').notEmpty();

  var validacoesErros = req.validationErrors() || [];

  if (validacoesErros.length > 0) {
    validacoesErros.forEach(function(e) {
      req.flash('erro', e.msg);
    });
    return false;
  }

  return true;
}
