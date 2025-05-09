const mongoose = require('mongoose')
const Schema = mongoose.Schema

const suministroSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  tipo: {
    type: String,
    required: true
  },
  cantidad: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Suministro = mongoose.model('Suministro', suministroSchema);

module.exports = Suministro
