const mongoose = require('mongoose')
const Schema = mongoose.Schema

const comportamientoSchema = new Schema({
  animalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Animal', required: true },
  fecha: { type: Date, default: Date.now },
  descripcion: String,
  cuidador: { type: mongoose.Schema.Types.ObjectId, ref: 'Empleado' },
  zooId: { type: mongoose.Schema.Types.ObjectId, ref: 'Zoo', required: true },
}, { timestamps: true });

const RegistroComportamiento = mongoose.model('RegistroComportamiento', comportamientoSchema);

module.exports = RegistroComportamiento
