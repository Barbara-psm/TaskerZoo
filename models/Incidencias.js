const mongoose = require('mongoose')
const Schema = mongoose.Schema

const incidenciaSchema = new Schema({
  descripcion: String,
  fecha: { type: Date, default: Date.now },
  zonaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Zona' },
  reportadaPor: { type: mongoose.Schema.Types.ObjectId, ref: 'Empleado' },
  estado: { type: String, enum: ['pendiente', 'en curso', 'resuelta'], default: 'pendiente' },
  // zooId: { type: mongoose.Schema.Types.ObjectId, ref: 'Zoo', required: true },
}, { timestamps: true });

const Incidencia = mongoose.model('Incidencia', incidenciaSchema);

module.exports = Incidencia
