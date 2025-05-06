const mongoose = require('mongoose')
const Schema = mongoose.Schema

const suministroSchema = new Schema({
  nombre: { type: String, required: true },
  cantidad: { type: Number, default: 0 },
  descripcion: String,
  // zonaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Zona' },
  zona: String,
  // zooId: { type: mongoose.Schema.Types.ObjectId, ref: 'Zoo', required: true },
}, { timestamps: true });

const Suministro = mongoose.model('Suministro', suministroSchema);

module.exports = Suministro
