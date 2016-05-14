var mongoose = require('mongoose');

module.exports = function() {

	var entidadesSchema = mongoose.Schema({
		entidade: {
			type: String,
			required: true,
			trim: true,
			unique: true
		},
		valor: {
			type: Number
		},
		data_cad: {
			type: Date,
			default: Date.now
		}
	});

	return mongoose.model('Entidades', entidadesSchema);
}
