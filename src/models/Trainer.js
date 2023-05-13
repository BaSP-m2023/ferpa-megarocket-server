const mongoose = require('mongoose');

const { Schema } = mongoose;

const trainerSchema = new Schema({
  id: {
    type: Number,

  },
  firstName: {
    type: String,

  },
  lastName: {
    type: String,

  },
  dni: {
    type: Number,

  },
  phone: {
    type: Number,

  },
  email: {

  },
  city: {
    type: String,

  },
  password: {

  },
  salary: {
    type: Number,

  },
  isActive: {
    type: Boolean,

  },
});

module.exports = mongoose.model('Trainer', trainerSchema);
