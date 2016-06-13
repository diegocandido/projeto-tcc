var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

module.exports = function() {
	var doacaoSchema = mongoose.Schema({
		_entidades: {
			type: String,
			trim: true
		},
		valordoado: {
			type: String
		},
		data: {
			type: Date,
			default: Date.now
		}
	});
	var usuarioSchema = mongoose.Schema({
		nome: {
			type: String,
			trim: true
		},
		email: {
			type: String,
			trim: true,
			unique: true,
			index: true
		},
		cpf: {
			type: String,
			trim: true
		},
		endereco: {
			type: String,
			trim: true
		},
		numero: {
			type: String,
			trim: true
		},
		complemento: {
			type: String,
			trim: true
		},
		bairro: {
			type: String,
			trim: true
		},
		cep: {
			type: String,
			trim: true
		},
		cidade: {
			type: String,
			trim: true
		},
		doacoes: [doacaoSchema],
		password: {
			type: String
		},
		valortotal: {
			type: String
		},
		data_cad: {
			type: Date,
			default: Date.now
		}
	});
	usuarioSchema.methods.generateHash = function(password) {
		return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
	};
	usuarioSchema.methods.validPassword = function(password, old_password) {
		return bcrypt.compareSync(password, old_password, null);
	}
	return mongoose.model('Usuarios', usuarioSchema);
}
