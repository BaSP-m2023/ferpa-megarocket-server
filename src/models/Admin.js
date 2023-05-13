const mongoose = require('mongoose');

const { Schema } = mongoose;

const adminSchema = new Schema({
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  dni: {
    type: Number,
  },
  phone: {
    type: Number,
  },
  email: {
    type: String,
  },
  city: {
    type: String,
  },
  password: {
    type: String,
  },
});

module.exports = mongoose.model('Admin', adminSchema);
