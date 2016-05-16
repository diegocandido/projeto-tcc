var mongoose = require('mongoose');

module.exports = function() {

	var doacaoSchema = mongoose.Schema({
		identidade: {
			type: String,
			trim: true
		},
		idusuario: {
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

	return mongoose.model('Doacao', doacaoSchema);
}
