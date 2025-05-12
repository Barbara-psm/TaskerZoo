const mongoose = require('mongoose')
const Schema = mongoose.Schema

const eventoSchema = new Schema({
  nombre: String,
  descripcion: String,
  fecha: Date,
  hora: String,
  zona: String,
}, { timestamps: true });

const Evento = mongoose.model('Evento', eventoSchema);

module.exports = Evento
