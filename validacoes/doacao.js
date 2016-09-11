var url = require('url');

module.exports = function(req, res) {
  var createUrl = url.parse(req.url).pathname == "/doar/boleto";
  var updateUrl = !createUrl;

  app.use(expressValidator({
    customValidators: {
      gte: function(param, num) {
        return param >= num;
      }
    }
  }));

  req.checkQuery('erro', 'Preco precisa ser acima de R$ 10,00').gte(10)

  var validacoesErros = req.validationErrors() || [];

  if (validacoesErros.length > 0) {
    validacoesErros.forEach(function(e) {
      req.flash('erro', e.msg);
    });
    return false;
  }

  return true;
}
