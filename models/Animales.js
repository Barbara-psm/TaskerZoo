const mongoose = require('mongoose')
const Schema = mongoose.Schema

const animalSchema = new Schema({
  nombre: String,
  especie: String,
  edad: String,
  sexo: { type: String, enum: ['M', 'F', 'Desconocido'], default: 'Desconocido' },
  familiaCientifica: String,
  zona: String,
}, { timestamps: true });

const Animal = mongoose.model('Animal', animalSchema);

module.exports = Animal
