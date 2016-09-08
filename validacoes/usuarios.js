var url = require('url');

module.exports = function(req, res) {
	var createUrl = url.parse(req.url).pathname == "/usuarios/create";
	var updateUrl = !createUrl;

	req.assert('nome', 'Informe o seu Nome Completo.').notEmpty();
	req.assert('cpf', 'Informe o seu CPF.').notEmpty();
	req.assert('endereco', 'Informe o seu Endereço.').notEmpty();
	req.assert('numero', 'Informe o Número da Casa/Prédio.').notEmpty();
	req.assert('bairro', 'Informe o seu Bairro.').notEmpty();
	req.assert('cep', 'Informe o seu Cep.').notEmpty();
	req.assert('uf', 'Informe o seu Estado.').notEmpty();
	req.assert('cidade', 'Informe o seu Cidade.').notEmpty();
	req.assert('password_confirmar', 'Informe sua senha.').notEmpty();
	if (createUrl) {
		req.assert('email', 'E-mail inválido.').isEmail();
		req.assert('password', 'Sua senha deve conter no minímo 6.')
			.len(6, 200);
	}

	var validateErros = req.validationErrors() || [];

	//verificar se a senha confere
	if (req.body.password != req.body.password_confirmar) {
		validateErros.push({
			msg: 'Senha não confere.'
		});
	}

	if (validateErros.length > 0) {
		validateErros.forEach(function(e) {
			req.flash('erro', e.msg);
		});
		return false;
	} else {
		return true;
	}
}
