const mongoose = require('mongoose')
const Schema = mongoose.Schema

const incidenciaSchema = new Schema({
  descripcion: String,
  fecha: { type: Date, default: Date.now },
  zona: {
    type: Schema.Types.ObjectId,
    ref: 'Zona',
    required: true
  },
  reportadaPor: { type: mongoose.Schema.Types.ObjectId, ref: 'Empleado' },
  estado: { type: String, enum: ['pendiente', 'resuelta'], default: 'pendiente' },
}, { timestamps: true });

const Incidencia = mongoose.model('Incidencia', incidenciaSchema);

module.exports = Incidencia
