var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var Usuarios = require('./usuarios');
var Entidades = require('./entidades');

module.exports = function() {

	var doacaoSchema = mongoose.Schema({
		_entidades: [{
			type: Schema.Types.ObjectId,
			ref: 'Entidades'
		}],
		_usuario: [{
			type: Schema.Types.ObjectId,
			ref: 'Usuarios'
		}],
		valordoado: {
			type: String
		},
		data: {
			type: Date,
			default: Date.now
		}
	});


	return mongoose.model('Doacao', doacaoSchema);
}
