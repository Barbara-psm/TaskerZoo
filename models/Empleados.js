const mongoose = require('mongoose')
const Schema = mongoose.Schema

const empleadoSchema = new Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contraseña: { type: String, required: true },
  rol: { type: String, enum: ['cuidador', 'veterinario', 'admin', 'monitor', 'taquilla'], default: 'cuidador' },
  zooId: { type: mongoose.Schema.Types.ObjectId, ref: 'Zoo', required: true },
}, { timestamps: true });

const Empleado = mongoose.model('Empleado', empleadoSchema);

module.exports = Empleado;
