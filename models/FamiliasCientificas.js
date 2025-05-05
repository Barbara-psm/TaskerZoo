const mongoose = require('mongoose')
const Schema = mongoose.Schema

const familiaSchema = new Schema({
  nombreComun: { type: String, required: true },
  nombreCientifico: { type: String, required: true },
  descripcion: String,
  taxonomia: String,
  zooId: { type: mongoose.Schema.Types.ObjectId, ref: 'Zoo', required: true },
}, { timestamps: true });

const FamiliaCientifica = mongoose.model('FamiliaCientifica', familiaSchema);

module.exports = FamiliaCientifica;
