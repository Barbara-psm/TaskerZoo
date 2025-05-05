const mongoose = require('mongoose')
const Schema = mongoose.Schema

const aforoSchema = new Schema({
  fecha: { type: Date, required: true },
  entradasVendidas: { type: Number, default: 0 },
  zooId: { type: mongoose.Schema.Types.ObjectId, ref: 'Zoo', required: true },
}, { timestamps: true });

const Aforo = mongoose.model('Aforo', aforoSchema);

module.exports = Aforo
