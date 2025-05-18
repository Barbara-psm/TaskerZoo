const mongoose = require('mongoose')
const Schema = mongoose.Schema

const aforoSchema = new Schema({
  fecha: { type: Date, required: true },
  entradasVendidas: { type: Number, default: 0 },
}, { timestamps: true });

const Aforo = mongoose.model('Aforo', aforoSchema);
module.exports = Aforo