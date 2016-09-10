module.exports = function(app) {

  var nodemailer = require('nodemailer');

  var HomeController = {
    index: function(req, res) {
      res.render('home/index');
    },

    email: function(req, res) {
      res.render('home/email');
    },

    sobre: function(req, res) {
      res.render('home/sobre');
    },

    obrigado: function(req, res) {
      res.render('home/obrigado');
    },

    comodoar: function(req, res) {
      res.render('home/comodoar');
    },
    legislacao: function(req, res) {
      res.render('home/legislacao');
    },
    logout: function(req, res) {
      req.session.destroy();
      res.redirect('/');
    },
    enviar: function(req, res) {
      var transport = nodemailer.createTransport("SMTP", {
        host: "smtp.mandrillapp.com",
        port: 587,
        auth: {
          user: "#",
          pass: "#"
        }
      });

      var mailOptions = {
        from: req.body.nome + " <" + req.body.email + ">",
        to: "diego@diegocandido.com",
        subject: req.body.assunto,
        text: req.body.mensagem
      }

      transport.sendMail(mailOptions, function(err, response) {
        if (err) {
          req.flash('erro', 'Erro ao enviar e-mail: ' + err);
          res.redirect('/email');
        } else {
          req.flash('info', 'E-mail enviado com sucesso!');
          res.redirect('/email');
        }
      });
    }
  }

  return HomeController;
}
