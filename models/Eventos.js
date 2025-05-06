const mongoose = require('mongoose')
const Schema = mongoose.Schema

const eventoSchema = new Schema({
  nombre: String,
  descripcion: String,
  fecha: Date,
  hora: String,
  zonaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Zona' },
  // zooId: { type: mongoose.Schema.Types.ObjectId, ref: 'Zoo', required: true },
}, { timestamps: true });

const Evento = mongoose.model('Evento', eventoSchema);

module.exports = Evento
