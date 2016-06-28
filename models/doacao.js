var mongoose = require('mongoose');

module.exports = function() {

  var doacoesSchema = mongoose.Schema({
    _entidades: {
      type: String,
      trim: true
    },
    _usuario: {
      type: String,
      trim: true
    },
    valordoado: {
      type: Number
    },
    status: {
      type: String
    },
    data: {
      type: Date,
      default: Date.now
    }
  });

  return mongoose.model('Doacoes', doacoesSchema);
}
