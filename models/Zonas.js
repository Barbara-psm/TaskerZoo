const mongoose = require('mongoose')
const Schema = mongoose.Schema

const zonaSchema = new Schema({
  nombre: { type: String, required: true },
  estado: { type: String, required: true },
}, { timestamps: true });

const Zona = mongoose.model('Zona', zonaSchema);

module.exports = Zona;
