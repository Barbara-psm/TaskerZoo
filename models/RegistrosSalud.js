const mongoose = require('mongoose')
const Schema = mongoose.Schema

const registroSaludSchema = new Schema({
  animalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Animal', required: true },
  fecha: { type: Date, default: Date.now },
  tipoRevision: String,
  observaciones: String,
  veterinario: { type: mongoose.Schema.Types.ObjectId, ref: 'Empleado' },
  // zooId: { type: mongoose.Schema.Types.ObjectId, ref: 'Zoo', required: true },
}, { timestamps: true });

const RegistroSalud = mongoose.model('RegistroSalud', registroSaludSchema);

module.exports = RegistroSalud
