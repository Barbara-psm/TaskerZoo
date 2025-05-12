const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema

const empleadoSchema = new Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contraseña: { type: String, required: true },
  rol: { type: String, enum: ['cuidador', 'veterinario', 'admin', 'monitor', 'taquilla'], default: 'cuidador' },
}, { timestamps: true });

//Para encriptar la contraseña antes de guardar el usuario
empleadoSchema.pre('save', async function (next) {
  if (!this.isModified('contraseña')) return next();
  this.contraseña = await bcrypt.hash(this.contraseña, 10);
  next();
});

// Método para comparar contraseñas
empleadoSchema.methods.compararContraseña = async function (contraseñaIngresada) {
  return await bcrypt.compare(contraseñaIngresada, this.contraseña);
};

const Empleado = mongoose.model('Empleado', empleadoSchema);

module.exports = Empleado;
