const mongoose = require('mongoose')
const Schema = mongoose.Schema

const animalSchema = new Schema({
  nombre: String,
  especie: String,
  fechaNacimiento: Date,
  sexo: { type: String, enum: ['M', 'F', 'Desconocido'], default: 'Desconocido' },
  familiaCientificaId: { type: mongoose.Schema.Types.ObjectId, ref: 'FamiliaCientifica', required: true },
  // zonaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Zona' },
  zona: String,
  otrosDatos: String,
  // zooId: { type: mongoose.Schema.Types.ObjectId, ref: 'Zoo', required: true },
}, { timestamps: true });

const Animal = mongoose.model('Animal', animalSchema);

module.exports = Animal
