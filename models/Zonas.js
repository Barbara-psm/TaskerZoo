const mongoose = require('mongoose')
const Schema = mongoose.Schema

const zonaSchema = new Schema({
  nombre: { type: String, required: true },
  descripcion: String,
  zooId: { type: mongoose.Schema.Types.ObjectId, ref: 'Zoo', required: true },
}, { timestamps: true });

const Zona = mongoose.model('Zona', zonaSchema);

module.exports = Zona;
