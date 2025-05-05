const mongoose = require('mongoose')
const Schema = mongoose.Schema

const zooSchema = new Schema({
  nombre: { type: String, required: true, unique: true },
}, { timestamps: true });

const Zoo = mongoose.model('Zoo', zooSchema);

module.exports = Zoo;
