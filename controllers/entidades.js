module.exports = function(app) {

  var Entidade = app.models.entidades;

  var EntidadesController = {
    index: function(req, res) {
      Entidade.find(function(err, dados) {
        if (err) {
          req.flash('erro', 'Erro ao buscar usuários: ' + err);
          res.redirect('/entidades');
        } else {
          res.render('entidades/index', {
            lista: dados
          });
        }
      });
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
    create: function(req, res) {
      res.render('entidades/create', {
        user: new Entidade()
      });
    },
    post: function(req, res) {
      var model = new Entidade();
      model.nomedaentidade = req.body.nomedaentidade;
      model.telefone = req.body.telefone;
      model.email = req.body.email;
      model.site = req.body.site;
      model.cnpj = req.body.cnpj;
      model.ie = req.body.ie;
      model.im = req.body.im;
      model.cidade = req.body.cidade;
      model.texto = req.body.texto;
      model.cidade = req.body.cidade;
      model.save(function(err) {
        if (err) {
          req.flash('erro', 'Erro ao cadastrar: ' + err);
          res.render('entidades/create', {
            user: req.body
          });
        } else {
          req.flash('info', 'Registro cadastrado com sucesso!');
          res.redirect('/entidades');
        }
      });
    }
  }
  return EntidadesController;
}
